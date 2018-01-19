// 工厂模式
// 缺点：对象无法识别，因为所有的实例都指向一个原型
function createPerson(name) {
  var o = new Object();
  o.name = name;
  o.getName = function () {
      console.log(this.name);
  };

  return o;
}

var person = createPerson('Rainy');

person.getName()

// 构造函数模式
// 优点：解决了每个方法都要被重新创建的问题
function Person(name) {
    this.name = name;
    this.getName = getName
}

function getName() {
  console.log(this.name);
};

var person1 = new Person('Rainy')

person1.getName()

