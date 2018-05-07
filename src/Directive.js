import Dep from './dep'
import Watcher from './Watcher'

class Directive {
  constructor(type, raw, scope){
    const watcher = new Watcher(raw, scope, this.update.bind(this))
    Dep.target = watcher
    let value = scope.model[raw]
    Dep.target = null
    this.update(raw, scope)
  }
}

export default Directive