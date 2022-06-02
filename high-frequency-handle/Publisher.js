class Publisher {
  constructor() {
    this.observers = []
  }

  add(observer) {
    this.observers.push(observer)
  }

  remove(observer) {
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }

  notify() {
    this.observers.forEach((observer) => {
      observer.update()
    })
  }
}

class Observer {
  constructor() {

  }

  update() {
    console.log('Observer.update invoked');
  }
}