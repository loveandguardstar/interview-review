// 模拟jsonp 
// 只能模拟 get 请求
// 构造函数，地址，参数
const jsonp = (url, params, callbackName) => {
    // 序列化入参
    const generateUrl = (params) => {
        let dataSrc = ''
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                dataSrc = `${key}=${params[key]}&`
            }
        }
        dataSrc += `callback=${callbackName}`
        return url + '?' + dataSrc
    }
    // 生成 jsonp 请求
    return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.url = generateUrl(params)
        document.body.appendChild(script)
        window[callbackName] = data => {
            resolve(data)
            document.removeChild(scriptEle)
        }
    })
}