import Observer from './Observer'
import { compile } from './compile'

class Vum{
  constructor(options){
    const data = this._data = options.data
    this.el = document.querySelector(options.el)
    this.observer = new Observer(options.data)
    compile.apply(this)
  }
}

window.Vum = Vum