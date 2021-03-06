// 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
function curry(fn) {
  var _args = [];
  return function() {
    [].push.apply(_args, [].slice.call(arguments));
    if(_args.lenght === fn.length) {
      const args = _args;
      _args = [];
      return fn.apply(this, args);
    }
    
    // return arguments.callee;  // 包含当前正在执行的函数,但是ES5被禁止使用了
    return curry.call(this);
  }
}
function curry3(fn, args) {
  length = fn.length;

  args = args || [];

  return function() {

      var _args = args.slice(0),

          arg, i;

      for (i = 0; i < arguments.length; i++) {

          arg = arguments[i];

          _args.push(arg);

      }
      if (_args.length < length) {
          return curry3.call(this, fn, _args);
      }
      else {
          return fn.apply(this, _args);
      }
  }
}

var fn3 = curry3(function(a, b, c) {
  console.log([a, b, c]);
});

console.log(fn3("a", "b", "c")) // ["a", "b", "c"]
console.log(fn3("a", "b")("c")) // ["a", "b", "c"]
console.log(fn3("a")("b")("c")) // ["a", "b", "c"]
console.log(fn3("a")("b", "c")) // ["a", "b", "c"]

// 带占位符
function curry5(fn, args, holes) {
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
            return curry5.call(this, fn, _args, _holes);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}

var _ = {}

var fn5 = curry5(function(a, b, c, d, e) {
    console.log([a, b, c, d, e]);
    return a + d;
});

console.log(fn5(_, 2, 3, 4, 5)(1))
console.log(fn5(1, _, 3, 4, 5)(2))
console.log(fn5(1, _, 3)(_, 4)(2)(5))
console.log(fn5(1, _, _, 4)(_, 3)(2)(5))
console.log(fn5(_, 2)(_, _, 4)(1)(3)(5))
