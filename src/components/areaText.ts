export class XrAreaText extends HTMLElement {
    private mode:boolean
    static get observedAttributes(){
        return ['value']
    }
    constructor(){
        super()
        this.mode = this.getAttribute('mode')=='true' ? true : false
        let container:HTMLElement
        if(this.mode){
            // input mode
            container = document.createElement('textarea')
            // a custom event to send the input value
            const xrInput = new CustomEvent('xrInput',{detail:{message:''}})
            let isComposition = false
            container.addEventListener('compositionstart',()=>{
                isComposition = true
            })
            container.addEventListener('compositionend',(e)=>{
                isComposition = false
                xrInput.detail.message = e.data
                this.dispatchEvent(xrInput)
            })
            container.addEventListener('input',(e)=>{
                // wait composition finish.
                if (isComposition){
                    return
                }
                const target = e.target as HTMLInputElement
                xrInput.detail.message = target.value
                this.dispatchEvent(xrInput)
            })
        }else{
            // show mode
            container = document.createElement('span')

        }
        this.appendChild(container)
    }
    connectedCallback(){
    }
    attributeChangedCallback(_name:string,_oldValue:string,newValue:string){
        // value can only be displayed in show mode.
        if(this.mode){
            this.querySelector('textarea')!.value = newValue
            
        }    
        this.querySelector('span')!.innerText = newValue
        
    }
}