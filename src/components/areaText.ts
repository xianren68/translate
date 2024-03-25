export class AreaText extends HTMLElement {
    constructor(){
        super()
    }
    connectedCallback(){
        const mode = this.getAttribute('mode') || false
        console.log(mode)
        const container = document.createElement('div')
        // 输入模式
        if(mode){
            container.innerHTML = `<textarea>ddd</textarea>`
        }else{
            container.innerHTML = `<span>fsf</span>`
        }
        this.appendChild(container)
    }
}