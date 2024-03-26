export class xrSelect extends HTMLElement {
  private static template: string = `<template id="lang-pattern">
   <div class="show">
     <div class="text"></div>
     <div class="ic">
       <svg class="icon" aria-hidden="true">
         <use xlink:href="#icon-xiala"></use>
     </svg>
     </div>
   </div>
   <div class="select">
   </div>
 </template>`
 private active: number = 0
 private isOpen: boolean = false
  constructor() {
    super()
    const value = this.getAttribute("value") || "无可选项"
    const values = JSON.parse(this.getAttribute("values") || "[]")
    const template = document.createElement("template")
    template.innerHTML = xrSelect.template
    const content = template.content.cloneNode(true) as HTMLElement
    console.log(content)
    const selected = content?.querySelector(".show") as HTMLElement
    const text = selected.getElementsByClassName(".text")[0] as HTMLElement
    text.innerText = value
    const select = content.querySelector(".select") as HTMLElement
    select.innerHTML = values.map((value:string)=>{
      return `<div class="${value==text.innerText?'option active':'option'}">${value}</div>`
  }).join("")
    // switch selected by clicking(event delegation).
    select.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      if (select.childNodes[this.active] == target) {
        return
      }
      (select.childNodes[this.active] as HTMLElement).classList.remove(
        "active"
      )
      this.active = Array.from(select.childNodes).indexOf(target)
      target.classList.add("active")
      text.innerText = target.innerText
      this.isOpen = false
      select.classList.remove("open")
    })
    // open or close the language selection box.
    const icon = selected.querySelector(".ic") as HTMLElement
    icon.addEventListener("click", () => {
      this.isOpen = !this.isOpen
      this.isOpen
        ? select.classList.add("open")
        : select.classList.remove("open")
    })
    this.appendChild(content)
  }
  connectedCallback() {}
}
