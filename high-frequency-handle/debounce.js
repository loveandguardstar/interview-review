// 触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时。

// 简单版：函数内部支持使用 this 和 event 对象；
/**
 * 
 * @param { function } fn 防抖函数
 * @param { number } wait 防抖时间
 * @returns 返回执行时间
 */
const debounce = (fn, wait) => {
    let tempSet
    return function () {
        let args = arguments, context = this;
        if (tempSet) clearTimeout(tempSet)
        tempSet = setTimeout(function () {
            fn.apply(context, args)
        }, wait)
    }
}
// 最终版，支持 立即执行，函数可能有返回值，支持取消功能
function midDebounce(fn, wait, immediate) {
    // 立即执行，当第一次加载时，立即执行
    let timeout, ret
    let debounced = function () {
        let context = this, args = arguments
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            // 执行过不再执行
            let callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if (callNow) ret = fn.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                fn.apply(context, args)
            }, wait)
        }
        return ret
    }

    debounced.cancle = function() {
        clearTimeout(timeout)
        timeout = null
    }

    return debounced
}