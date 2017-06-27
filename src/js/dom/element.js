export default class element {

    constructor(tag, attributes, block) {

        this.e = document.createElement(tag);

        if (typeof block == 'string') {
            this.e.innerHTML = block;
        } else if  (block instanceof HTMLElement) {
            this.e.appendChild(cellData.html);
        }

        for (let i in attributes) {   
            this.e.setAttribute(i, attributes[i]);
        }

    }
        

    text(t) {
        this.e.textContent = t;
        return this;
    }

    get() {
        return this.e;
    }
      

    toString() {
        return this.e.innerHTML;
    }      
        

}    