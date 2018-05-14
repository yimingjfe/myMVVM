import Directive from './Directive'
import * as directives from './directives'

function compile(){
  const el = this.el
  const data = this._data
  // 解析指令 遍历节点的attributes  如果是v-开头  new  Directive, directive初始化值显示 scope.directiveArray
  const fragment = node2Fragment(el)
  compileTemplate(fragment, data)

  el.appendChild(fragment)
}

function node2Fragment(node){
  const fragment = document.createDocumentFragment()
  let child;
  while(child = node.firstChild){
    fragment.appendChild(child)
  }
  return fragment
}

function parseNode(node, data){
  if(node.nodeType === 3){
    parseTextNode(node, data)
  } else if(node.nodeType === 1 || node.nodeType === 11) {
    parseElementNode(node, data)
  }
}

function parseTextNode(node, data){
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

function parseElementNode(node, data){
  const attrs = node.attributes
  let parentNode = node.parentNode.nodeType === 9
  const directiveArray = []
  const scope = {
    parentNode: node.parentNode,
    nextSibling: node.nextSibling,
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
      compileTemplate(item, data)
    })
  }
}

function compileTemplate(node, data){
  const directiveArray = []
  if(node.nodeType !== 11) parseNode(node, data)
  Array.from(node.childNodes).forEach(child => parseNode(child, data))
}

export { compile }