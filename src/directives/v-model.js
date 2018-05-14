import Directive from '../Directive'

function onchange(value){
  scope.model[raw] = value
}

class Vmodel extends Directive{
  constructor(type, raw, scope){
    super(type, raw, scope)
    scope.el.addEventListener('input', (e) => {
      scope.model[raw] = e.target.value
    })
    this.bind()
  }

  update(newValue){
    this.el.value = newValue
  }
}

export default Vmodel