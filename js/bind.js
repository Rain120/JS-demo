// bind() 方法会创建一个新函数。当这个新函数被调用时，
// bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

var foo = {
  value: 1
}

function bar() {
  console.log(this.value)
}

var bindFoo = bar.bind(foo)

bindFoo()

Function.prototype.bind2 = Function.prototype.bind || function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () {};

  var  fBound = function() {
    // 这个时候的arguments是指bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments)
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，
    // 实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }

  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

var value = 2;

function bar1(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar1.prototype.friend = 'Rainy';

var bindFoo2 = bar1.bind(foo, 'daisy');

var obj = new bindFoo2('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);