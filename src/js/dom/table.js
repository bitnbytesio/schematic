import element from './element';

export default class table {

    constructor() {       
     
        this.t = new element('table', {class: 'schematic-table'}).get();   
    }      

    
	header ( h , m ) {



        let header = this.t.createTHead();

        let rowIndex = 0;

        let row = header.insertRow(rowIndex);

        let cellIndex = 0;         
             

        for (let i = 0; i < h.length; i++) { 
           
            let cellData = h[i];

            let cell = row.insertCell(cellIndex);

            
            if (typeof cellData == 'string') {

                if (typeof m == 'boolean' && m == true ) {
                    cell.innerHTML = cellData;
                } else {
                    cell.innerHTML = '<strong>' + cellData + '</strong>';
                }
            } else if (cellData instanceof HTMLElement) {
                cell.appendChild(cellData);
            }

            
            cellIndex++;
            

        }
       

        return this;

	}
        
    footer ( h, m ) {

      
        let footer = this.t.createTFoot();   

        let rowIndex = 0;

        let row = footer.insertRow(rowIndex);

        let cellIndex = 0;

        for (let i = 0; i < h.length; i++) { 
           
            let cellData = h[i];

            if (typeof h[i] == 'object') {
                cellData = h[i].html;              

            } 

            let cell = row.insertCell(cellIndex);

            if (h[i].colSpan) {
                cell.colSpan = h[i].colSpan;
            }

            if (typeof cellData == 'string') {
                
                 if (typeof m == 'boolean' && m == true ) {
                    cell.innerHTML = cellData;
                } else {
                    cell.innerHTML = '<strong>' + cellData + '</strong>';
                }

            } else if (cellData instanceof HTMLElement) {
                cell.appendChild(cellData);
            }       

            cellIndex++;
            

        }


        return this;

    }

     tbody( rows ) {


        var body = this.t.createTBody();

        for (let i = 0; i< rows.length; i++) {
            var row = rows[i];
            var trow = body.insertRow(i);
            let index = 0;

            for (let j in Object.keys(row)) {

                var cell = trow.insertCell(index);

                if (typeof row[j] == 'string') {
                    cell.innerHTML = row[j];
                } else if (row[j] instanceof HTMLElement) {
                    cell.appendChild(row[j]);
                } 

                index++;
            }

        }

    }
    

    get() {
    	return this.t;
    }

    toString() {
        return this.t.innerHTML;
    }    

}