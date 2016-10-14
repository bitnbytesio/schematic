 'use strict';
 
 schematic.register('decorator', function () { 

 	var stage = null;
    var helper = schematic.get('@helpers');


    this.table = function (c) {

        var t = this.element('table', {class: 'schematic-table'}).get();

    	this.header = function ( h , m ) {

            var header = t.createTHead();

            if (typeof m == 'boolean' && m == true) {
             
             var rowIndex = 0;
              var row = header.insertRow(rowIndex);
              var cellIndex = 0;
                for (var i in h) { 
                   
                    var cellData = h[i];

                    var cell = row.insertCell(cellIndex);
                    cell.innerHTML = cellData.html;
                    if (typeof cellData.colSpan != 'undefined') {
                        cell.colSpan = cellData.colSpan;
                    }
                    cellIndex++;
                    

                }


            } else {
                var row = header.insertRow(0);
                var cellIndex = 0;
                for (var i in h) {                   
                    var cell = row.insertCell(cellIndex);
                    cell.innerHTML = '<strong>' + h[i] + '</strong>';
                    cellIndex++;
                }
            }

            return this;

    	}
        
        this.footer = function ( h , m ) {

            var footer = t.createTFoot();

            if (typeof m == 'boolean' && m == true) {

              var rowIndex = 0;
              var row = footer.insertRow(rowIndex);
              var cellIndex = 0;
                for (var i in h) { 
                   
                    var cellData = h[i];

                    var cell = row.insertCell(cellIndex);
                    if (typeof cellData.html == 'string') {
                        cell.innerHTML = cellData.html;
                    } else if (cellData.html instanceof HTMLElement) {
                        cell.appendChild(cellData.html);
                    }
                    if (typeof cellData.colSpan != 'undefined') {
                        cell.colSpan = cellData.colSpan;
                    }
                    cellIndex++;
                    

                }

            } else {
                var row = footer.insertRow(0);
                var cellIndex = 0;
                for (var i in h) {                   
                    var cell = row.insertCell(cellIndex);
                    cell.innerHTML = h[i];
                    cellIndex++;
                }
            }

            return this;

        }

         this.tbody = function ( rows ) {
            var body = t.createTBody();

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

        };
    

        this.get = function () {
        	return t;
        };

        this.toString = function () {
            return t.innerHTML;
        };




        return this;

    };

    

    this.element = function ( tag, attributes, block) {

       
        var e = document.createElement(tag);

        if (block == 'string') {
            e.innerHTML = block;
        }

        for (var i in attributes) {
   
            e.setAttribute(i, attributes[i]);
        }

        this.text = function (t) {
            e.textContent = t;
            return this;
        }

        this.get = function () {
            return e;
        };
      

        this.toString = function () {
            return e.innerHTML;
        };

        return this;
        

    };
         
    return this;       
       
});