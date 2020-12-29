
function updateStyle(evt) {
  const inputElement = evt.target
  document.querySelectorAll(inputElement.dataset.querySelector).forEach(renderState.bind(null,inputElement))
  localStorage.setItem("memeSettings",JSON.stringify(getAllStateValues()))
}

function renderState (inputElement,domNode) {
  const newValue = inputElement.value
  const offset = inputElement.dataset.subtract && -parseInt(domNode.style[inputElement.dataset.subtract])/2 || ""
  domNode.style[inputElement.dataset.style] = newValue + offset + inputElement.dataset.units
  if(inputElement.dataset.dep) {
    const depInput = document.getElementById(inputElement.dataset.dep)
    depInput.dispatchEvent(new Event('input'))
  }
}

function getAllStateValues() {
  return Array.from(document.querySelectorAll('input.meme-style-control')).reduce((acc,inputEl)=>{
    return {...acc,[inputEl.id]:inputEl.value}
  },{})
}

function loadInputsFromStore () {
  const memeSettings = JSON.parse(localStorage.getItem("memeSettings"))
  if(memeSettings) {
    Object.keys(memeSettings).forEach((key) => {
      document.getElementById(key).value = memeSettings[key]
      document.getElementById(key).dispatchEvent(new Event('change'))
    })
  }
}

//Auto-generate event listeners from all inputs
Array.from(document.querySelectorAll('input.meme-style-control')).forEach((el)=> {
  el.addEventListener('input',updateStyle)
  el.dispatchEvent(new Event('input'))
})

loadInputsFromStore()
