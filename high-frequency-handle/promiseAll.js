Promise.all = function(promiseAll) {
  let idx = 0, ret = []
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        idx++
        ret[i] = val
        if (idx === promiseAll.length) {
          resolve(ret)
        }
      }, err => {
        reject(err)
      })
    })
  })
}