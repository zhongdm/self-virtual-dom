const patch = require('./patch')

function diff(oldTree, newTree){
  let index = 0
  let patches = {}
  dfWalk(oldTree, newTree, index, patches)
  return patches
}

function dfWalk(oldNode, newNode, index, patches) {
  let currentPatches = []
  if(newNode == null || newNode == undefined){
    // removed
  }
  else if(typeof newNode == "string"){
    // 字符串
    currentPatches.push({type: patch.TEXT, node: newNode})
  }
  else if(oldNode.tagName == newNode.tagName
    && oldNode.key == newNode.key // TODO: key--处理节点个数不变，顺序打乱的情况
    ){
    // 比较props
    let currentProps = diffProps(oldNode, newNode)
    if(currentProps) {
      currentPatches.push({type: patch.PROPS, props: newNode})
    }
    // 比较子节点
    diffChildren(oldNode.children, newNode.children, index, patches)
  }
  else {
    currentPatches.push({type: patch.REPLACE, node: newNode})
  }
  // diffChildren(oldNode.children, newNode.children, index, patches)

  if(currentPatches.length) {
    patches[index] = currentPatches
  }
}

function diffChildren(oldChildren, newChildren, index, patches) {
  listDiff(oldChildren, newChildren, 'key')
  let leftNode = null
  var currentIndex = index

  oldChildren.forEach(function(child, i){
    var newChild = newChildren[i]
    currentIndex = (leftNode && leftNode.count) 
                  ? currentIndex + leftNode.count + 1 
                  : currentIndex + 1
    dfWalk(child, newChild, currentIndex, patches)
    leftNode = child
  })
}

function diffProps(oldNode, newNode){
  for(var prop in newNode.props) {
    return oldNode.props[prop] && oldNode.props[prop] != newNode.props[prop]
      ? newNode.props[prop]
      : ''

  }
}

function listDiff(oldChildren, newChildren, keywords){
  for(var i = 0; i < oldChildren.length; i++) {
    let keyValue = oldChildren[i].props 
  }

  oldChildren.forEach(function(child, i){
    child.key
  })

}

module.exports = diff