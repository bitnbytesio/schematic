 @deps(['element'])
 export default class table {

    constructor(element) {       
     
        this.t = new element('table', {class: 'schematic-table'}).get();   
    }      

    
	header ( h , m ) {

        var header = this.t.createTHead();

        var rowIndex = 0;

        var row = header.insertRow(rowIndex);

        var cellIndex = 0;         
             

        for (let i in h) { 
           
            var cellData = h[i];

            var cell = row.insertCell(cellIndex);

            
            if (typeof cellData.html == 'string') {

                if (typeof m == 'boolean' && m == true ) {
                    cell.innerHTML = cellData.html;
                } else {
                    cell.innerHTML = '<strong>' + cellData[i] + '</strong>';
                }
            } else if (cellData.html instanceof HTMLElement) {
                cell.appendChild(cellData.html);
            }

            if (typeof cellData.colSpan != 'undefined') {
                cell.colSpan = cellData.colSpan;
            }
            cellIndex++;
            

        }
       

        return this;

	}
        
    footer ( h ) {

        var footer = this.t.createTFoot();   

        var rowIndex = 0;

        var row = footer.insertRow(rowIndex);

        var cellIndex = 0;

        for (var i in h) { 
           
            var cellData = h[i];

            var cell = row.insertCell(cellIndex);

            if (typeof cellData.html == 'string') {
                
                 if (typeof m == 'boolean' && m == true ) {
                    cell.innerHTML = cellData.html;
                } else {
                    cell.innerHTML = '<strong>' + cellData[i] + '</strong>';
                }

            } else if (cellData.html instanceof HTMLElement) {
                cell.appendChild(cellData.html);
            }

            if (typeof cellData.colSpan != 'undefined') {
                cell.colSpan = cellData.colSpan;
            }

            cellIndex++;
            

        }


        return this;

    }

     tbody( rows ) {
        var body = this.t.createTBody();

        for (var i in rows) {
            var row = rows[i];
            var trow = body.insertRow(i);

            for (var j in row) {
                var cell = trow.insertCell(j);
                if (typeof row[j] == 'string') {
                    cell.innerHTML = row[j];
                } else if (row[j] instanceof HTMLElement) {
                    cell.appendChild(row[j]);
                } else if (typeof row[j] == 'object') {
                    cell.innerHTML = row[j].toString();
                }

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