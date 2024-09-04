export function debounce(func, delay) {
  let timer = null

  return function () {
    let context = this
    let args = arguments

    timer && clearTimeout(timer)

    timer = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}

// 使用示例:
// const btn = document.querySelector('button')
// const payMoney = () => console.log('付款成功')
// btn.addEventListener('click', debounce(payMoney, 1000))

export function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  
  if (obj instanceof Date) return new Date(obj)

  if (obj instanceof RegExp) return new RegExp(obj)

  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj

  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)

  let cloneObj = new obj.constructor()

  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }

  return cloneObj
}

export function copyText(text) {
  // text是复制文本
  // 创建input元素
  const el = document.createElement('input')
  // 给input元素赋值需要复制的文本
  el.setAttribute('value', text)
  // 将input元素插入页面
  document.body.appendChild(el)
  // 选中input元素的文本
  el.select()
  // 复制内容到剪贴板
  document.execCommand('copy')
  // 删除input元素
  document.body.removeChild(el)
}
