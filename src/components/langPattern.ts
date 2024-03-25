export class LangPattern extends HTMLElement {
    private static readonly LANGUAGES: string[] = ['中文', 'English', '日本語']
    private active:number = 0
    // whether to display the language selection box.
    private isOpen:boolean = false
    constructor(){
        super()
        const pattern = this.getAttribute('pattern') || '中文'
        const template = document.getElementById('lang-pattern') as HTMLTemplateElement
        const content = template?.content.cloneNode(true) as DocumentFragment
        const patternShow =  content?.querySelector('.show') as HTMLElement
        const text = patternShow.getElementsByClassName('text')[0] as HTMLElement
        text.innerText = pattern
        const select = content.querySelector('.select') as HTMLElement
        select.innerHTML = LangPattern.LANGUAGES.map((lang)=>{
            return `<div class="${lang==text.innerText?'option active':'option'}">${lang}</div>`
        }).join("");
         // select language pattern and modify selected style by event delegation.
         select.addEventListener('click',(e)=>{
            const target = e.target as HTMLElement
            if(select.childNodes[this.active] == target){
                return
            }
            (select.childNodes[this.active] as HTMLElement).classList.remove('active')
            this.active = Array.from(select.childNodes).indexOf(target)
            target.classList.add('active')
            text.innerText = target.innerText
            this.isOpen = false
            select.classList.remove('open')
        })
        // open or close the language selection box.
        const icon = patternShow.querySelector('.ic') as HTMLElement
        icon.addEventListener('click',()=>{
            this.isOpen = !this.isOpen
            this.isOpen?select.classList.add('open'):select.classList.remove('open')
        })
        this.appendChild(content)
    }
}