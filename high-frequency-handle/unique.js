function unique(arr) {
  let res = arr.filter(function(item, idx, array) {
    return array.indexOf(item) === idx
  })
  return res
}