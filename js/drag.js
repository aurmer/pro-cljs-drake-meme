const dragState = {
  isDragging: false,
  anchorX: 0,
  anchorY: 0,
  dragHandler: null
}

function getTransformValues(element) {
  const style = window.getComputedStyle(element)
  const matrix = style.transform || style.webkitTransform || style.mozTransform
  if (matrix !== 'none') {
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
    return [Math.floor(matrixValues[4]),Math.floor(matrixValues[5])]
  }
}

const myEl = document.getElementById('test')

function dragStartHandler (evt) {
  evt.preventDefault()
  dragState.isDragging = true
  const [currX,currY] = getTransformValues(evt.target) || [0,0]
  dragState.anchorX = evt.clientX - currX
  dragState.anchorY = evt.clientY - currY
  dragState.dragHandler = (mouseMoveEvent)=>mouseMoveHandler(evt.target,mouseMoveEvent)
  document.addEventListener('mousemove',dragState.dragHandler)
  evt.target.style.position = "absolute"
  document.getElementById('ctrl-container-'+evt.target.id).style.display = "block"
}

document.addEventListener('mouseup',()=> {
  if(dragState.isDragging) {
    document.removeEventListener('mousemove',dragState.dragHandler)
    dragState.isDragging = false
  }
})

function mouseMoveHandler(element,evt) {
  const finalX = evt.clientX-dragState.anchorX
  const finalY = evt.clientY-dragState.anchorY
  element.style.transform = `translate(${finalX}px,${finalY}px)`
}
