function Element (tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
  this.key = props 
      ? props.key
      : void 666
  
  let count = 0
  this.children.forEach(function(child, i){
    if(child instanceof Element) {
      count += child.count
    }
    else {
      children[i] = child
    }
    count++
  })

  this.count = count
}

Element.prototype.render = function(){
  var el = document.createElement(this.tagName)
  var props = this.props

  for(var propsName in props) {
    el.setAttribute(propsName, props[propsName])
  }

  var children = this.children || []
  children.forEach(function(child){
    var childEle = (child instanceof Element) 
      ? child.render()
      : document.createTextNode(child)

      el.appendChild(childEle)
  })

  return el
}
module.exports = function(tagName, props, children) {
  return new Element(tagName, props, children);
}