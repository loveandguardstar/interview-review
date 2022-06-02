class Publisher {
  constructor() {
    this.observers = []
    console.log('Pbulisher created');
  }

  add(observer) {
    console.log('Publisher.add invoked');
    this.observers.push(observer)
  }

  remove(observer) {
    console.log('Pbulisher.remove invoked');
    this.observersforEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    });
  }

  notify() {
    console.log('Publisher.notify invoked');
    this.observers.forEach(observer => {
      observer.update(this)
    })
  }
}