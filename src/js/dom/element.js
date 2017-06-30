export default class element {


    constructor(tag, attributes, block) {

        this.tag = tag;
        this.attributes = attributes;
        this.block = block;    

        this.textContent = false;    

    }
        

    text(t) {
        this.textContent = t;
        return this;
    }

    get() {


        let e = document.createElement(this.tag);


        if (typeof this.block == 'string') {
            e.innerHTML = this.block;
        } else if  (this.block instanceof HTMLElement) {
            e.appendChild(this.block);
        }

        for (const i of  Object.keys(this.attributes)) {   
            e.setAttribute(i, this.attributes[i]);
        }

        if (this.textContent) {
            e.textContent = this.textContent;
        } 

        return e;
    }
      

    toString() {
        return this.get().innerHTML;
    }      
        

}    