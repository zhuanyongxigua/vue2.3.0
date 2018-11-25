import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'

// 增加了一些属性如config、util、set、del、options等；
// 把keep-alive组件的一些属性复制给Vue.options.components；
// 初始化use方法，就是Vue的属性，没有放在原型中。
// 初始化mixin方法，其实就是util里面的mergeOptions方法，把参数和options合起来。options里面就是Vue实例化时候的参数。比如data、created、methods等。
// 有了extend方法？
// 遍历赋值ASSET_TYPES？
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Vue.version = '__VERSION__'

export default Vue
