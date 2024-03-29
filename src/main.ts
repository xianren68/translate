import { invoke } from '@tauri-apps/api/tauri'
import { listen } from "@tauri-apps/api/event";
import { xrSelect, XrAreaText } from './components'
import type { Res } from './type'
window.customElements.define('xr-select', xrSelect)
window.customElements.define('xr-areatext', XrAreaText)

function main() {
  const inputValue = document.getElementById('inputValue') as HTMLInputElement
  const outputValue = document.getElementById('outputValue') as HTMLInputElement
  // get translated data.
  listen<Res>('translate', (event: any) => {
    outputValue.setAttribute('value', event.detail.message)
  })
  // get input value.
  inputValue.addEventListener('xrInput', (event: any) => {
    console.log(event.detail.message)
    invoke('translate',{from:'zh',to:'en',q:event.detail.message})
  })
}
main()
