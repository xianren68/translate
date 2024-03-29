export class xrSwitch extends HTMLElement {
    static get observedAttributes() {
        return ['value']
    }
    constructor() {
        super()
        // Add shadow dom.
        const shadow = this.attachShadow({ mode: 'open' })
        const value = this.getAttribute('value')
        const click = new CustomEvent('xrClick', { detail: value })
        this.addEventListener('click', () => {
            this.dispatchEvent(click)
        })
    }
    attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
        if(newValue == 'light'){

        }else {

        }
    }
}