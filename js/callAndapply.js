// apply 和 call都可以切换函数的执行环境(上下文)，即可改变this绑定的对象
// 但是二者的区别是apply的参数是对象数组，而call是参数列表

var foo = {
  value: 1,
  bar: function() {
      console.log(this.value)
  }
};

foo.bar(); // 1

Function.prototype.call2 = function(context) {
  var context = context || window
  context.fn = this;
  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
      args.push('arguments[' + i + ']');
  }
  console.log(args)
  
  var result = eval('context.fn(' + args +')')

  delete context.fn;
  return result
}
var value = 2;

var obj = {
    value: 1
}

Function.prototype.apply2 = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
      result = context.fn();
  }
  else {
      var args = [];
      for (var i = 0, len = arr.length; i < len; i++) {
          args.push('arr[' + i + ']');
      }
      result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}

function bar(name, age, gender) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age,
        gender: gender
    }
}

console.log(bar.call(null)); // 2

console.log(bar.call2(obj, 'Rainy', 18, 'male'));