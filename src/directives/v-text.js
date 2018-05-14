import Directive from '../Directive'

class Vtext extends Directive{

  constructor(...args){
    super(...args)
    this.bind()
  }

  update(newValue){
    this.el.textContent = newValue
  }
}

export default Vtext