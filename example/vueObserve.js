function observer(target) {
  if (target && typeof target === 'object') {
    Object.keys(target).forEach((key) => {
      defineReactive(target, key, target[key])    
    })
  }
}

function defineReactive(target, key, val) {
  const dep = new Dep()
  observer(val)
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      dep.notify()
    },
    set: function(value) {
      console.log(`${target}属性从${val}变成了${value}`);
      val = value
    }
  })
}

class Dep {
  constructor() {
    this.subs = []
  }
  add(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}