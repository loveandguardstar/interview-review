// 触发高频事件，且 N 秒内只执行一次。

// 简单版：使用时间戳来实现，立即执行一次，然后每 N 秒执行一次。
/**
 * 
 * @param {function} fn 需要节流函数
 * @param {string} wait 节流时间
 * @returns 节流函数
 */
function simplethrottle(fn, wait) {
  let previous  = 0, timeout
  let context, args
  return function() {
    context = this
    args = arguments
    let now = new Date().getTime()
    if (timeout) clearTimeout(timeout)
    
    if ((now - previous ) > wait) {
      timeout = setTimeout(function() {
        previous  = now
        fn.call(context, args)
      }, wait)
    }
  }
}
function midThrottle(fn, wait) {
  let previous = 0, timeout 
  let context, args

  function later() {
    previous = +new Date()
    timeout = null
    fn.apply(fn, args)
  }

  function throttled() {
    let now = +new Date()
    context = this
    args = arguments
    let remaining  = wait - (now - previous)
    if (remaining  <= 0 || remaining > wait) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      fn.apply(fn, args)
    } else if (!timeout) {
      timeout = setTimeout(later, wait)
    }
  }

  return throttled
}
// 最终版：支持取消节流；
// 另外通过传入第三个参数，
// options.leading 来表示是否可以立即执行一次，
// opitons.trailing 表示结束调用的时候是否还要执行一次，默认都是 true。
// 注意设置的时候不能同时将 leading 或 trailing 设置为 false。
/**
 * 节流函数
 * @param {function} fn 需要节流函数
 * @param {number} wait 时间
 * @param {object} options 额外参数,leading = true立即执行一次，trailing = true结束是否还要 
 * @returns 节流函数
 */
function highThrottle(fn, wait, options) {
  let previous = 0, timeout, ret
  let context, args
  if (!options) options = {}

  // 延迟执行
  function later() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  }

  // 节流函数
  function throttled() {
    let now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)

    context = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      fn.apply(context, args)
    } else if (!timeout && options.trailing !== false){
      timeout = setTimeout(later, remaining)
    }
  }

  return throttled
}