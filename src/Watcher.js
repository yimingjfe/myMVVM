class Watcher {
  constructor(raw, scope, updateMethod){
    this.raw = raw
    this.scope = scope
    this.update = updateMethod
  }

  run(){
    this.update(this.raw, this.scope)
  }
}

export default Watcher