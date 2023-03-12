/**
 * 心跳基类
 */
export class Heart {
  HEART_TIMEOUT = null // 心跳计时器
  SERVER_HEART_TIMEOUT = null // 心跳计时器

  constructor() {
    this.timeout = 30000
  }

  // 重置
  reset() {
    clearInterval(this.HEART_TIMEOUT)
    // clearTimeout(this.SERVER_HEART_TIMEOUT)
    return this
  }

  /**
   * 启动心跳
   * @param {Function} cb 回调函数
   */
  start(cb) {
    this.HEART_TIMEOUT = setInterval(() => {
      cb()

      // this.SERVER_HEART_TIMEOUT = setTimeout(() => {
      //   cb()
      //   // 重新开始检测
      //   this.reset().start(cb)
      // }, this.timeout)
    }, this.timeout)
  }
}
