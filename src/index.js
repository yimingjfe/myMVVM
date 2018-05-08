import Observer from './Observer'
import { compile } from './compile'

class Vum{
  constructor(options){
    const data = this._data = options.data
    this.el = document.querySelector(options.el)
    this.observer = new Observer(options.data)
    this.proxyData(data)
    compile.apply(this)
  }

  proxyData(data){
    for(let key in data){
      Object.defineProperty(this, key, {
        get(){
          return this._data[key]
        },
        set(value){
          this._data[key] = value
        }
      })
    }
  }
}

window.Vum = Vum