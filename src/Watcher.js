import Dep from './dep'
class Watcher {
  constructor(raw, scope, updateMethod){
    this.raw = raw
    this.scope = scope
    this.update = updateMethod
    Dep.target = this
    this.value = scope.model[raw]
    Dep.target = null
  }

  run(){
    const oldValue = this.value
    const newValue = this.scope.model[this.raw]
    this.update(newValue, oldValue)
  }
}

export default Watcher