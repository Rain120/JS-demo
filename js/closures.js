// this指针

function fn() {
  console.log('fn() this ==>', this);
}
fn();

var obj = {
  name: 'Rainy',
  printName() {
    console.log('obj name:', this.name);
    console.log('obj ==>', this);
  }
}

obj.printName();

function Foo(name) {
  this.name = name;
}

var f = new Foo('Rainy');

function fnCall(name) {
  console.log('fnCall name:', name)
  console.log('fnCall this ==>', this);
}

fnCall.call({x: 1}, 'Rainy')

function fnApply(name, age) {
  console.log('fnApply name:' , name, 'age:', age);
  console.log('fnApply this ==>', this);
}

fnApply.apply({y: 2}, ['Rainy', 21]);

var fnBind = function(name) {
  console.log('fnBind name ==> ', name);
  console.log('fnBind this ==> ', this);
}.bind({z: 3})

fnBind('Rainy');

// 如何理解作用域
// 自由变量
// 作用域链，即自由变量的查找
// 闭包的应用场景
var a = 1;

function fn() {
  var b = 2;
  function fn1() {
    var c = 3;
    console.log(a)
    console.log(b)
    console.log(c)
  }
  fn1()
}

fn();

// 闭包的作用：封装变量、收敛权限
// 使用场景：
// 函数作为返回值
function Fn() {
  var a = 1;
  return function() {
    console.log('Fn ==> ', a);
  }
}

var f = new Fn();
var a = 200;
f();

// 函数作为参数传递

function Fn2(fn) {
  var a = 200;
  fn();
}

Fn2(f);
/**创建10个a标签，点击每个a标签弹窗该标签的数字 */
for(var i = 0; i < 10; i ++ ) {
  (function(i) {
    var a = document.createElement('a');
    a.innerHTML = i + '&nbsp;&nbsp;&nbsp;';
    a.addEventListener('click', function(e) {
      e.preventDefault();
      alert(i);
    })
    document.body.appendChild(a);
  })(i);
}

for(var i = 0; i < 5; i ++) {
  setTimeout(() => {
    console.log(i)
  }, 1000);
}

for(var i = 0; i < 5; i ++) {
  (function(i) {
    setTimeout(() => {
      console.log(i)
    }, 1000);
  })(i);
}

function isFirstLoad() {
  var _list = [];
  return function(id) {
    if(_list.indexOf(id) >= 0) {
      return false;
    } else {
      _list.push(id);
      return true;
    }
  }
}

var firstLoad = isFirstLoad();
console.log(firstLoad(10));
console.log(firstLoad(10));
console.log(firstLoad(20));
console.log(firstLoad(30));
console.log(firstLoad(20));