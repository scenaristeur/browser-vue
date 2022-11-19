let bloid_display_version = "0.0.1"
console.log("display v"+bloid_display_version)

if (typeof bloidDisplay !== 'undefined') {
  let bloidDisplay = null
}

if (typeof bloidComponent !== 'undefined') {
  let bloidComponent = null
}

bloidDisplay = document.getElementById("bloid-display")
bloidComponent = document.getElementById("execute-code")

console.log(bloidDisplay)
if (bloidDisplay == null){
  bloidDisplay = document.createElement('div')
  bloidDisplay.setAttribute('div', bloidDisplay)
  bloidComponent.append(bloidDisplay)
}

bloidDisplay.innerHTML = "Bloid Display is ready version "+bloid_display_version

console.log(bloidDisplay)
