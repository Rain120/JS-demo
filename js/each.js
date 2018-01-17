function each(obj, callback) {
  var i = 0;
  var length = obj.length
  for (; i < length; i++) {
      value = callback(i, obj[i]);
  }
}

function eachWithCall(obj, callback) {
  var i = 0;
  var length = obj.length
  for (; i < length; i++) {
      value = callback.call(obj[i], i, obj[i]);
  }
}

var arr = Array.from({length: 1000000}, (v, i) => i);

console.time('each')
var i = 0;
each(arr, function(index, item){
  i += item;
})
console.timeEnd('each')


console.time('eachWithCall')
var j = 0;
eachWithCall(arr, function(index, item){
  j += item;
})
console.timeEnd('eachWithCall')