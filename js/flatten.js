// 扁平化
// 数组的扁平化，就是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组。

var arr = [1, [2, [3, 4]]];

function flattenOrigin(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
      if (Array.isArray(arr[i])) {
          result = result.concat(flatten(arr[i]))
      }
      else {
          result.push(arr[i])
      }
  }
  return result;
}

// toString
function flatten2string(arr) {
  return arr.toString().split(',').map(function(item){
      return +item
  })
}

// reduce
function flatten2reduce(arr) {
  return arr.reduce(function(prev, next){
      return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

function flatten1(arr) {

  while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr);
  }

  return arr;
}
// ES6
console.log([].concat(...arr)); // [1, 2, [3, 4]]

console.log(flattenOrigin(arr)) // [1, 2, 3, 4]
console.log(flatten2string(arr)) // [1, 2, 3, 4]
console.log(flatten2reduce(arr)) // [1, 2, 3, 4]
console.log(flatten1(arr)) // [1, 2, 3, 4]

/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 * shallow true + strict false ：正常扁平一层
 * shallow false + strict false ：正常扁平所有层
 * shallow true + strict true ：去掉非数组元素
 * shallow false + strict true ： 返回一个[]
 */
function flatten(input, shallow, strict, output) {

  // 递归使用的时候会用到output
  output = output || [];
  var idx = output.length;

  for (var i = 0, len = input.length; i < len; i++) {

      var value = input[i];
      // 如果是数组，就进行处理
      if (Array.isArray(value)) {
          // 如果是只扁平一层，遍历该数组，依此填入 output
          if (shallow) {
              var j = 0, len = value.length;
              while (j < len) output[idx++] = value[j++];
          }
          // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
          else {
              flatten(value, shallow, strict, output);
              idx = output.length;
          }
      }
      // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
      else if (!strict){
          output[idx++] = value;
      }
  }

  return output;

}

console.log(flatten(arr, true, true)); // [3, 4]