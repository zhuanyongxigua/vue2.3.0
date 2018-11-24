import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 这个方法从下面的initMixin来的。
  this._init(options)
}

// 这个方法就是让Vue有了_init这个方法。只有这一个功能。
initMixin(Vue)
// 定义了$data、$props、$set、$delete、$watch，都放在了原型里面。
// 感觉有点像global API，但是在最外面的index里面有一个初始化global API的东西。
// $set就是给对象加响应式属性的API，里面会调用defineReactive。
// __ob__应该就是observer。
stateMixin(Vue)
// 给Vue加上了$on、$once、$off、$emit方法，加到了原型上面。
eventsMixin(Vue)
// 给Vue加上了_update、$forceUpdate、$destroy方法，在原型上。
lifecycleMixin(Vue)
// 在Vue圆形上加了$nextTick、_render方法。赋值了一堆东西，如_o、_n等。
renderMixin(Vue)

export default Vue
