import Directive from './Directive'
import * as directives from './directives'


function node2Fragment(node){
  const fragment = document.createDocumentFragment()
  let child;
  while(child = node.firstChild){
    fragment.appendChild(child)
  }
  return fragment
}

class Compiler{
  constructor(el, data){
    this.el = el
    this.data = data
    const fragment = node2Fragment(el)
    this.compileTemplate(fragment, data)
    el.appendChild(fragment)
  }

  compileTemplate(node, data){
    const directiveArray = []
    if(node.nodeType !== 11) this.parseNode(node, data)
    Array.from(node.childNodes).forEach(child => this.parseNode(child, data))
  }

  parseNode(node, data){
    if(node.nodeType === 3){
      this.parseTextNode(node, data)
    } else if(node.nodeType === 1 || node.nodeType === 11) {
      this.parseElementNode(node, data)
    }
  }

  parseTextNode(node, data){
    let textRaw;
    let parentNode = node.parentNode
    const directiveArray = []
    const scope = {
      parentNode,
      nextSibling: node.nextSibling,
      el: node,
      directiveArray: directiveArray,
      model: data
    }
    const textContent = node.textContent.trim()
    if(textContent && /\{\{(.+)\}\}/.test(textContent)){
      textRaw = RegExp.$1
      textRaw = textRaw && textRaw.trim()
      const directiveType = 'Vtext'
      const DirectiveClass = directives[directiveType]
      directiveArray.push(new DirectiveClass(directiveType, textRaw, scope))
    }
  }
  
  parseElementNode(node, data){
    const attrs = node.attributes
    const directiveArray = []
    const scope = {
      parentNode: node.parentNode,
      nextElementSibling: node.nextElementSibling,
      el: node,
      directiveArray: directiveArray,
      model: data
    }
    let textRaw;
  
    Array.from(attrs).forEach(attr => {
      const name = attr.name
      if(name.startsWith('v-')){
        const directiveType = 'V' + name.slice(2)
        const raw = attr.value
        console.log('raw', raw)
        const DirectiveClass = directives[directiveType]
        if(DirectiveClass) directiveArray.push(new DirectiveClass(directiveType, raw, scope))
      }
    })
  
    if(node.childNodes){
      const childNodes = node.childNodes
      childNodes && Array.from(childNodes).forEach(item => {
        this.compileTemplate(item, data)
      })
    }
  }
}

export default Compiler