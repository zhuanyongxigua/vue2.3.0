/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    // 这个地方很恶心，如果没有这个赋值空数组的话，在下次new的时候这个subs还可能是有东西的，所以还是没有搞清楚是如何同时通知两个视图的。
    this.subs = []
  }

  // 在new Watcher的时候有调用。塞进来的也是那个Watcher。
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // 这个东西，谁调，就把当前Dep.target发给谁
  depend () {
    if (Dep.target) {
      // 传进去的this是dep，addDep方法里面的this是Dep.target，也就是一个watcher。
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    // 算是深拷贝。
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null
const targetStack = []

export function pushTarget (_target: Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
