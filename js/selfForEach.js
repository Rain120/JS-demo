function selfForEach(obj, fn) {
  if(obj instanceof Array) {
    obj.forEach(function(item, index) {
      fn(index, item);
    })
  } else {
    for (var key in obj) {
      if(obj.hasOwnProperty(key)) {
        fn(key, obj[key]);
      }
    }
  }
}

var arr = [1, 2, 3, 4]
selfForEach(arr, function(index, item) {
  console.log('arr', index, item);
})

var obj = {
  x: 100,
  y: 200
}
selfForEach(obj, function(index, item) {
  console.log('obj', index, item);
})