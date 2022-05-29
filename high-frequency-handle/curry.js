// 主要思路是什么呢，要判断当前传入函数的参数个数 (args.length)
// 是否大于等于原函数所需参数个数 (fn.length) ，如果是，则执行当前函数；
// 如果是小于，则返回一个函数。
const curry1 = (fn, ...args) => {
  return args.length >= fn.length
  ? fn(...args)
  : (..._args) => curry1(fn, ...args, ..._args)
}


// rest参数用于获取函数的多余参数，这样就不需要使用arguments对象了。
// rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();


// 函数柯里化1
let curry2 = function(fn) {
  let args = [].slice.call(arguments, 1)
  return function() {
    let newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

function sub_curry(fn) {
  var args = [].slice.call(arguments, 1)
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

function curry(fn, length) {
  length = length || fn.length

  var slice = Array.prototype.slice

  return function() {
    // 柯里化后的闭包函数
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments))
      return curry(sub_curry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}