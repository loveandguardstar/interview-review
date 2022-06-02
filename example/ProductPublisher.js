// 定义一个产品类发布订阅
// 产品将开发拉入，生成文档后就立马通知

class Publisher {
  constructor() {
    this.observers = []
  }

  add(observer) {
    this.observers.push(observer)
  }

  remove(observer) {
    this.observers.forEach((item, idx) => {
      if (observer === item) {
        this.observers.splice(idx, 1)
      }
    })
  }

  notify() {
    this.observers.forEach(item => {
      item.update()
    })
  }
}

class Observer {
  constructor() {
    console.log('Observer created');
  }

  update() {
    console.log('Observer.update invoked');
  }
}

class PrdPublisher extends Publisher {
  constructor() {
    super()
    // 初始化原型
    this.prdState = null
    this.observers = []
  }
  getState() {
    return this.prdState
  }
  setState(state) {
    this.prdState = state
    this.notify() 
  }
}

class DeveloperObserver extends Observer {
  constructor() {
    super()
    this.prdState = {}
  }

  update(publisher) {
    this.prdState = publisher
    this.work()
  }

  work() {
    const prd = this.prdState
    // ... 搬砖开始
    console.log('996 begins...')
  }
}

const lilei = new DeveloperObserver()
const A = new DeveloperObserver()
const B = new DeveloperObserver()
const hanMeiMei = new PrdPublisher()
const prd = {}
hanMeiMei.add(lilei)
hanMeiMei.add(A)
hanMeiMei.add(B)
hanMeiMei.setState(prd)