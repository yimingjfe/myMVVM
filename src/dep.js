class Dep {
  constructor(){
    this.watchers = []
  }

  addWatcher(watcher){
    this.watchers.push(watcher)
  }

  notify(){
    this.watcher.forEach(watcher => {
      watcher.update()
    })
  }
}

export default Dep