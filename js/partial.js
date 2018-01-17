// 偏函数 
//在计算机科学中，局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。
// 什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。
// 固定一个函数的一个或者多个参数，也就是将一个n 元函数转换成一个 n - x 元函数。
var _ = {};

function partial(fn) {
  var args = [].slice.call(arguments, 1); // Array.prototype.slice.call(arguments)
  console.log(args)
  return function () {
    var position = 0,
      len = args.length;
    for (var i = 0; i < len; i++) {
      console.log(`args[${i}] ${args[i]}`)
      console.log(`_ ${_}`)
      args[i] = args[i] === _
        ? arguments[position++]
        : args[i]
    }
    while (position < arguments.length) 
      args.push(argumetns[position++]);
    return fn.apply(this, args);
  };
};

var subtract = function (a, b) {
  return b - a;
};
subFrom20 = partial(subtract, _, 20);
console.log(subFrom20(6))