import Directive from '../Directive'

class Vtext extends Directive{
  constructor(...args){
    super(...args)
  }
  update(raw, scope){
    scope.el.textContent = scope.model[raw]
  }
}

export default Vtext