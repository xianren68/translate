export class AreaText extends HTMLElement {
    constructor(){
        super()
    }
    connectedCallback(){
        const mode = this.getAttribute('mode') || false
        let container:HTMLElement
        // 输入模式
        if(mode){
            container = document.createElement('textarea')
        }else{
            container = document.createElement('span')
        }
        this.appendChild(container)
    }
}