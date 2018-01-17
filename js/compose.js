//  函数组合
var _ = {}
function curry(fn, args, holes) {
  length = fn.length;

  args = args || [];

  holes = holes || [];

  return function() {

      var _args = args.slice(0),
          _holes = holes.slice(0),
          argsLen = args.length,
          holesLen = holes.length,
          arg, i, index = 0;

      for (i = 0; i < arguments.length; i++) {
          arg = arguments[i];
          // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
          if (arg === _ && holesLen) {
              index++
              if (index > holesLen) {
                  _args.push(arg);
                  _holes.push(argsLen - 1 + index - holesLen)
              }
          }
          // 处理类似 fn(1)(_) 这种情况
          else if (arg === _) {
              _args.push(arg);
              _holes.push(argsLen + i);
          }
          // 处理类似 fn(_, 2)(1) 这种情况
          else if (holesLen) {
              // fn(_, 2)(_, 3)
              if (index >= holesLen) {
                  _args.push(arg);
              }
              // fn(_, 2)(1) 用参数 1 替换占位符
              else {
                  _args.splice(_holes[index], 1, arg);
                  _holes.splice(index, 1)
              }
          }
          else {
              _args.push(arg);
          }

      }
      if (_holes.length || _args.length < length) {
          return curry.call(this, fn, _args, _holes);
      }
      else {
          return fn.apply(this, _args);
      }
  }
}

function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
  };
};

// 非 pointfree，因为提到了数据：name
var initials = function (name) {
  return name.split(' ').map(compose(toUpperCase, head)).join('- ');
};

// pointfree
// 先定义基本运算
var split = curry(function(separator, str) { return str.split(separator) })
var head = function(str) { return str.slice(0, 1) }
var toUpperCase = function(str) { return str.toUpperCase() }
var join = curry(function(separator, arr) { return arr.join(separator) })
var map = curry(function(fn, arr) { return arr.map(fn) })

var initials = compose(join('-'), map(compose(toUpperCase, head)), split(' '));

console.log(initials("Rainy test the function demo"))