import Observer from './Observer'
import { compile } from './compile'
import Compiler from './compile'
// parseElementNode方法中parentNode的指向不应该是fragment
class Vum{
  constructor(options){
    const data = this._data = options.data
    this.el = document.querySelector(options.el)
    this.observer = new Observer(options.data)
    this.proxyData(data)
    this.compiler = new Compiler(this.el, data)
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


module.hot.accept(function () {
  location.reload()
});

window.Vum = Vum