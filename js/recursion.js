// 递归 

// 阶乘
function factorial(n) {
  if (n == 1) return n;
  return n * factorial(n - 1)
}

console.log(factorial(5)) // 5 * 4 * 3 * 2 * 1 = 120

// 斐波那契数列
function fibonacci(n){
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(5)) // 1 1 2 3 5