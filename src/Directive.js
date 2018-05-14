
import Watcher from './Watcher'

class Directive {
  constructor(type, raw, scope){
    Object.assign(this, scope)
    this.watcher = new Watcher(raw, scope, this.update.bind(this))
  }

  bind(){
    this.watcher.run()
  }
}

export default Directive