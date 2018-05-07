import Dep from './dep'

class Observer{
  constructor(model){
    this.dep = new Dep()
    this.model = model
    Object.keys(model).forEach( prop => {
      this.defineReactive(model, prop, model[prop])  // 属性数据是一个数组怎么处理？a.b.c这种数据怎么处理?
    })
  }

  defineReactive(model, prop, value){
    const dep = this.dep
    Object.defineProperty(model, prop, {
      get(){  // 如何保证只有第一次get增加addWatcher
        const target = Dep.target
        if(target){
          dep.addWatcher(Dep.target)
        }
        return value
      },
      set(newVal){
        model[prop] = newVal
        dep.notify()
      },
      writeable: true
    })
  }
}

export default Observer