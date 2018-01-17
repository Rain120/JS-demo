// 数组去重

var arr = [1, 1, '1', '1'];

// Origin
function unique(array) {
    // res用来存储结果
    var res = [];
    // for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    //     for (var j = 0, resLen = res.length; j < resLen; j++ ) {
    //         if (array[i] === res[j]) {
    //             break;
    //         }
    //     }
    //     // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    //     if (j === resLen) {
    //         res.push(array[i])
    //     }
    // }
    for (var i = 0, len = arr.length; i < len; i++) {
      var current = arr[i];
      if (res.indexOf(current) === -1) {
          res.push(current)
      }
    }
    return res;
}
console.log(unique(arr)); // [1, "1"]


function uniqueSort(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
      // 如果是第一个元素或者相邻的元素不相同
      if (!i || seen !== sortedArray[i]) {
          res.push(sortedArray[i])
      }
      seen = sortedArray[i];
  }
  return res;
}
console.log(uniqueSort(arr)); // [1, "1"]

//ES6
console.log(new Set(arr))

var array3 = [1, 1, 'a', 'A', 2, 2];

// iteratee 英文释义：迭代 重复
function unique(array, isSorted, iteratee) {
    var res = [];
    var seen = [];

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted) {
            if (!i || seen !== value) {
                res.push(value)
            }
            seen = value;
        }
        else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        }
        else if (res.indexOf(value) === -1) {
            res.push(value);
        }        
    }
    return res;
}

console.log(unique(array3, false, function(item){
    return typeof item == 'string' ? item.toLowerCase() : item
})); // [1, "a", 2]