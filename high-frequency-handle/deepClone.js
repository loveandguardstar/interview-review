// 深拷贝，对象，数组
/**
 * 深拷贝函数（包括对象、数组）
 * @param {*} target 需要拷贝的值
 * @returns 拷贝后新对象
 */
//  基于简单版的基础上，还考虑了内置对象比如 Date、RegExp 等对象和函数以及解决了循环引用的问题。
const isObject = (target) => (typeof target === "object" || typeof target === "function") && target !== null;

function deepClone(target, map = new Map()) {
  if (map.get(target)) return target

  // 获取当前值类型
  let constructor = target.constructor
  // 监测正则或者对象
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    // 创造一个新的正则对象
    return new constructor()
  }

  // 深拷贝
  if (isObject(target)) {
    map.set(target, true)
    let cloneTarget = Array.isArray(target) ? [] : {}
  
    if (isObject(target)) {
      for (let key in target) {
        if (target.hasOwnProperty(key)) cloneTarget = deepClone(target[key], map)
      }
    }
  
    return cloneTarget
  } else {
    return target
  }
}