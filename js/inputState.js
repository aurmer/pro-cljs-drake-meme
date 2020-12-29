//Auto-generate event listeners from all inputs
Array.from(document.querySelectorAll('input')).forEach((el)=> {
  document.querySelectorAll(el.dataset.querySelector).forEach((row)=> row.style[el.dataset.style] = el.value + el.dataset.units)
  el.addEventListener('input',(evt)=>updateStyle(el,evt.target.value))
  el.addEventListener('change',(evt)=>updateStyle(el,evt.target.value))
})

function updateStyle(inputElement,newValue) {
  document.querySelectorAll(inputElement.dataset.querySelector).forEach((row)=> {
    const sub = inputElement.dataset.subtract && parseInt(row.style[inputElement.dataset.subtract])/2 || 0
    row.style[inputElement.dataset.style] = newValue - sub + inputElement.dataset.units
    if(inputElement.dataset.dep) {
      const depInput = document.getElementById(inputElement.dataset.dep)
      updateStyle(depInput,depInput.value)
    }
  })
  localStorage.setItem("memeSettings",JSON.stringify(getAllValues()))
}

function getAllValues() {
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

loadInputsFromStore()
