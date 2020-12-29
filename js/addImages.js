function renderNewImageCard (index) {
  return `
    <img id="image${index}" class="draggable-image" src="" />
    <div id="ctrl-container-image${index}" style="display:none" class="input-container">
      <label for="ctrl-image${index}">Image ${index+1} Size</label>
      <input id="ctrl-image${index}" class="meme-style-control" type="range" min="0" max="2000" value="90" data-query-selector="#image${index}" data-style="height" data-units="px" />
    </div>
  `
}

function attachNewImageCard(newImageCard) {
  const myCard = document.createElement('div')
  myCard.classList.add = "image-card"
  myCard.innerHTML = newImageCard
  document.getElementById('draggable-images').insertBefore(myCard,document.getElementById('add-image-container'))
  requestAnimationFrame(()=> {
    const idx = document.getElementById('draggable-images').children.length-2
    const imgTag = document.getElementById(`image${idx}`)
    const inputTag = document.getElementById(`ctrl-image${idx}`)
    imgTag.addEventListener('dragstart',dragStartHandler)
    inputTag.addEventListener('input',(evt)=>updateStyle(inputTag,evt))
  })
}

document.getElementById('add-image-field').addEventListener('change',(evt)=>{
  const idx = document.getElementById('draggable-images').children.length-1
  const tgt = evt.target
  const file = tgt.files[0]

  requestAnimationFrame(()=>{
    // FileReader support
    if (FileReader && file && file.type.includes('image')) {
      attachNewImageCard(renderNewImageCard(idx))
      const fr = new FileReader();
      fr.onload = function () {
        document.getElementById(`image${idx}`).src = fr.result;
      }
      fr.readAsDataURL(file);
    }
  })

})
