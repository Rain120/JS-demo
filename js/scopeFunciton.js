// 闭包
// 函数 + 可访问的自由变量
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();  // 3
data[1]();  // 3
data[2]();  // 3

var data1 = [];

for (var i = 0; i < 3; i++) {
  data1[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data1[0]();  // 0
data1[1]();  // 1
data1[2]();  // 2