var arr = [6, 4, 1, 8, 2, 11, 23]

// Origin
var result = arr[0];
for (var i = 1; i < arr.length; i++) {
    result =  Math.max(result, arr[i]);
}
console.log("Origin Max Number:" + result);

// sort
arr.sort((prev, next) => {
  return prev - next
})
console.log("Sort Max Number: " + arr[arr.length - 1])

//Apply
console.log("Apply Max Number: " + Math.max.apply(null, arr))


//Reduce
console.log("Reduce Max Number: " + arr.reduce((prev, next) => {
  return Math.max(prev, next)
}))

// ES6
console.log("ES6 Max Number: " + Math.max(...arr))