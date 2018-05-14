import Directive from '../Directive'

export default class Vshow extends Directive{

  constructor(...args){
    super(...args)
    this.originDisplay = this.el.style.display
    this.bind()
  }

  update(isShow){
    console.log('isShow', isShow, this.originDisplay)
    var val = isShow ? (this.originDisplay || '') : 'none';
    this.el.style.display = val;
  }
}