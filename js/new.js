// new 
// 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
// new实现的步骤：
// 1. 创建一个空对象，用this变量引用它，该对象继承这个函数所有的原型
// 2. 属性和方法都加入到this的引用对象中
// 3. 新创建的对象都用this引用,最后隐式返回this

function Otaku (name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games'
  return 'handsome boy'
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

function objectFactory() {
  var obj = new Object()
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj
};

var person = objectFactory(Otaku, 'Rainy', '18')

console.log(person.name) // Rainy
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Rainy