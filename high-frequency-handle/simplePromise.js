const PENDING = 'pending'
const REJECTED = 'rejected'
const FULLFILLED = 'fullfilled'

const MyPromise = function(fn) {
  this.status = PENDING
  this.value = ''
  this.reason = ''

  const resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULLFILLED
      this.value = value
    }
  }

  const reject = (error) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = error
    }
  }

  try {
    fn(resolve, reject)
  } catch(error) {
    reject(error)
  }

  this.then = (onFullFill, onReject) => {
    if (this.status === FULLFILLED) {
      onFullFill(this.value)
    } else {
      onReject(this.reason)
    }
  }
}