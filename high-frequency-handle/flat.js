// 数组拍平
function flat(arr) {
  var result = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result.result.concat(flat(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
}