import { invoke } from '@tauri-apps/api/tauri'
import { xrSelect, XrAreaText } from './components'
window.customElements.define('xr-select', xrSelect)
window.customElements.define('xr-areatext', XrAreaText)

function main() {
  const inputValue = document.getElementById('inputValue') as HTMLInputElement
  const outputValue = document.getElementById('outputValue') as HTMLInputElement
  // get input value
  inputValue.addEventListener('xrInput', (event: any) => {
    outputValue.setAttribute('value', event.detail.message)
  })
}
main()
