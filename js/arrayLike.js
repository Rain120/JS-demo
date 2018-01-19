// 类数组
var array = ['name', 'age', 'sex'];

var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}

// 读写
console.log(array[0]); // name
console.log(arrayLike[0]); // name

array[0] = 'new name';
arrayLike[0] = 'new name';

console.log(array[0]); // name
console.log(arrayLike[0]); // name

// 长度
console.log(array.length); // 3
console.log(arrayLike.length); // 3

// 类数组调用数组方法
console.log(Array.prototype.join.call(arrayLike, '&')); // name&age&sex

console.log(Array.prototype.slice.call(arrayLike, 0)); // ["name", "age", "sex"] 
// slice可以做到类数组转数组

console.log(Array.prototype.map.call(arrayLike, function(item){
    return item.toUpperCase();
})); 

// 类数组转对象
// 1. slice
console.log(Array.prototype.slice.call(arrayLike)); // ["name", "age", "sex"] 
// 2. splice
console.log(Array.prototype.splice.call(arrayLike, 0)); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
console.log(Array.prototype.concat.apply([], arrayLike))