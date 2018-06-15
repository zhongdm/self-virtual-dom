
var REPLACE = 0
var REORDER = 1
var PROPS = 2
var TEXT = 3

function patch (node, patches) {
  var walker = {index: 0}
  dfsWalk(node, walker, patches)
}

function dfsWalk(node, walker, patches){
  var currentPatches = patches[walker.index]

  let len = node.childNodes
    ? node.childNodes.length
    : 0
  for(let i = 0; i < len; i++) {
    var child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
  }

  if (currentPatches) {
    applyPatches(node, currentPatches)
  }
}

function applyPatches(node, currentPatches) {
  currentPatches.forEach(function(currentPatch, i){
    switch(currentPatch.type){
      case REPLACE: 
        var newNode = currentPatch.node.render()
        node.parentNode.replaceChild(newNode, node)
        break;

      case REORDER: 

        break;

      case TEXT:
        if(node.textContent) {
          node.textContent = currentPatch.node
        }
        else {
          node.nodeValue = currentPatch.node
        }
        break;

      case PROPS:
        setProps(node, currentPatch)
        break

      default:
        throw new Error("patch type")
        break;
    }
  })
}

function setProps(node, currentPatch){
  let props = currentPatch.props.props
  for(var key in props) {
    node.setAttribute(key, props[key])
  }
}


patch.REPLACE = REPLACE
patch.REORDER = REORDER
patch.PROPS = PROPS
patch.TEXT = TEXT

module.exports = patch