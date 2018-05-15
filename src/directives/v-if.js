import Directive from '../Directive'
import { isInDom } from '../util';

export default class Vif extends Directive{
  constructor(...args){
    super(...args)
    this.anchorNode = document.createTextNode('')
    this.parentNode.appendChild(this.anchorNode)
    this.bind()
  }

  update(value, oldVal){
    let parentNode = this.parentNode
    if(!isInDom(parentNode)) parentNode = this.el.parentNode || this.nextElementSibling.parentNode
    if(!value){
      if(this.el.parentNode === parentNode) parentNode.replaceChild(this.anchorNode, this.el)
      if(this.nextElementSibling.hasAttribute('v-else')){
        if(this.nextElementSibling.parentNode !== parentNode){
          parentNode.insertBefore(this.nextElementSibling, this.anchorNode)
        }
      }
    } else {
      if(this.el.parentNode !== parentNode){
        parentNode.insertBefore(this.el, this.anchorNode)
      }
      if(this.nextElementSibling.hasAttribute('v-else') && parentNode === this.el.parentNode){
        parentNode.replaceChild(this.anchorNode, this.nextElementSibling)
      }
    }
  }

  // update(value){
  //   const isInDom = this.el.parentNode
  //   const parentNode = this.parentNode
  //   const nextNode = this.nextSibling
  //   if(value){  // 插入当前元素，else元素删除
  //     if(!isInDom){
  //       parentNode.replaceChild(this.el, this.anchorNode)
  //     }
  //     if(nextNode.hasAttribute('v-else')){
  //       parentNode.removeNode(nextNode)
  //     }
  //   } else {
  //     this.replaceNodeToAnchor()
  //     if(nextNode.hasAttribute('v-else')){
  //       parentNode.insertBefore(nextNode, this.anchorNode)
  //     }
  //   }
  // }
}