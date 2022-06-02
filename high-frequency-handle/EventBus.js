// 全局事件总线特点 —— 所有事件的发布/订阅操作，必须经由事件中心，静止一切 “私下交易”

class EventEmitter {
  constructor() {
    this.handles = []
  }

  on(eventName, cb) {
    if (!this.handles[eventName]) {
      this.handles[eventName] = []
    }

    this.handles[eventName].push(cb)
  }

  emit(eventName, ...args) {
    if (this.handles[eventName]) {
      const handles = this.handles[eventName].slice()
      handles.forEach(callback => {
        callback(...args)
      })
    }
  }

  off(eventName, cb) {
    const callbacks = this.handles[eventName]
    const idx = callbacks.indexOf(cb)
    if (idx !== -1) {
      callbacks.splice(idx, 1)
    }
  }

  once(eventName, cb) {
    const wrapper = (...args) => {
      cb(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}