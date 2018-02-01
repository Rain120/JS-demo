var arr = [];
var obj = {};
function fn() {}
console.log('Array.isArray(arr)==>', Array.isArray(arr));
console.log('arr instanceof Array==>', arr instanceof Array);
console.log('obj instanceof Object==>', obj instanceof Object);
console.log('fn instanceof Function==>', fn instanceof Function);
console.log('Function instanceof Object==>', Function instanceof Object);
console.log('fn instanceof Object==>', fn instanceof Object);

/**
 * new创建一个对象的过程：
 * 创建一个空对象，
 * 用this变量引用，该对象继承该函数的原型
 * 属性和方法加入到this的引用对象中
 * 新创建的对象由this引用，并最后隐式返回this
 *
 * 或者
 *
 * 创建一个新对象
 * 在构造函数的作用域赋给了新对象，因此this指向了该对象
 * 执行构造函数中的代码，为这个对象添加属性、方法
 * 返回新对象
 */

console.log(arr.__proto__);
console.log(obj.__proto__);
console.log(fn.__proto__);

console.log(fn.prototype);

console.log(obj.__proto__ === Object.prototype);

function Foo(name, age) {
  this.name = name;
}

Foo.prototype.alertName = function() {
  console.log('alert', this.name);
};

var f = new Foo("Rainy");

f.printName = function() {
  console.log(this.name);
};

f.printName();
f.alertName();
// f.__proto__.__proto__ ==> f.__proto__ = Foo.prototype 
// ==> Foo.prototype.__proto__ = Object.prototype
f.toString();

for (var item in f) {
  if (f.hasOwnProperty(item)) {
    console.log(item);
  }
}

function Animal() {
  this.eat = function() {
    console.log('Animal eat');
  }
}

function Dog() {
  this.bark = function() {
    console.log('Dog bark');
  }
}

Dog.prototype = new Animal();

var hashiqi = new Dog()

hashiqi.eat();
hashiqi.bark();


function Elem(id) {
  this.elem = document.getElementById(id);
}

Elem.prototype.html = function(val) {
  var elem = this.elem;
  if(val) {
    elem.innerHTML = val;
    return this;
  } else {
    return elem.innerHTML;
  }
}

Elem.prototype.on = function(type, fn) {
  var elem = this.elem;
  elem.addEventListener(type, fn);
  return this;
}

var div1 = new Elem('div1');
// console.log(div1.html());
div1.html('<p>Hello Prototype</p>').on('click', function() {
  alert('click');
}).html('<p>Hello HTML</p>');