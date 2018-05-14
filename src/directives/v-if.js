import Directive from '../Directive'

export default class Vif extends Directive{
  constructor(...args){
    super(...args)
    this.replaceNodeToAnchor()
    this.bind()
  }

  replaceNodeToAnchor(){
    const node = this.el
    this.anchorNode = document.createTextNode('')
    this.parentNode.replaceChild(this.anchorNode, node)
  }

  update(value){
    const isInDom = this.el.parentNode
    const parentNode = this.parentNode
    const nextNode = this.nextSibling
    if(value){  // 插入当前元素，else元素删除
      if(!isInDom){
        parentNode.replaceChild(this.el, this.anchorNode)
      }
      if(nextNode.hasAttribute('v-else')){
        parentNode.removeNode(nextNode)
      }
    } else {
      this.replaceNodeToAnchor()
      if(nextNode.hasAttribute('v-else')){
        parentNode.insertBefore(nextNode, this.anchorNode)
      }
    }
  }
}