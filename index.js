
var el = require('./element')
// const diff = require('./diff')
import diff from './diff'
import patch from './patch'


var ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item', key: 'key2'}, ['Item 3']),
  el('li', {class: 'item'}, ['Item 4'])
])
var root = ul.render()
document.body.appendChild(root)

var button = document.createElement('button')
button.onclick=function(){
    var newul = el('div', {id: 'list'}, [
      "welcome"
    ])
    var patches = diff(ul, newul)
    patch(root, patches)
}
button.textContent="render"
document.body.appendChild(button)

var newul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, [el('span', {id: 'span'},['Item ol 1']) ]),
  el('li', {class: 'item'}, ['Item ol 2']),
  el('li', {class: 'item2', id: "3"}, ['Item ol 3']),
  el('li', {class: 'item2', key: 'key2'}, ['Item 3'])
])
var patches = diff(ul, newul)
patch(root, patches)

