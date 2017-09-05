import element from './element';

import table from './table';

export default class draw  {

    constructor(app) {       
        this.app = app;               
    }

    get(model) {
     
        let app = this.app;

        // loop throug the model
        for (let p = 0; p < model.length; p++) {

            // create unique id for the form element
            let formId = app.name + ' ' + model[p].title;
            let appIdentity = formId.slug();

            // get form fields from json
            let fields = model[p].properties || model[p].fields || model[p].data;

            let tbody = [];

            // create fileds
            for (let iField = 0;  iField < fields.length; iField++) {

                tbody.push(this.createField(fields[iField]));

            }

            // create form submit or try now button
            let button = new element('button', {type: 'button', class:'schematic-btn btn-' + (model[p].method || 'get'), onclick:'schematic.tryNow("'+app.name+'", "'+appIdentity+'")', 'data-target':appIdentity }).text('Try Now').get();

            // start creating table
            let t = new table();
            
            // table header created
            t.header(['Parameter', 'Value', 'Description', 'Parameter Type', 'Data Type']);
            
            // insert data into table body    
            t.tbody(tbody);

            // create table footer
            t.footer([{html: button, colSpan:5}], true);
            
            // get table element instance
            var tableDom =  t.get();
            
            // create span element to display request method in title bar
            var method = new element('span', {class:'method'}).text((model[p].method || 'get')).get();

            // create span element to display request path in title bar
            var action = new element('span', {class:'action'}).text((model[p].action || '/')).get();

            // create title bar
            var bar = new element('div', {class:'heading'}).text((model[p].title || '')).get();

            // insert method span element in bar
            bar.appendChild(method);

            // insert action span element in bar
            bar.appendChild(action);

            // create the main panel
            var d = new element('div', {class:'panel ' + (model[p].method || 'get') }).get();

 
            // insert bar init
            d.appendChild(bar);

            // create panel body
            var b = new element('div', {class: 'body collapsey'}).get();


            // create panel body container
            var container = new element('div', {class: 'body-content'}).get();

            // form submission url 
            let action = model[p].action || model[p].url;
            
            // create form element
            var form = new element('form', {class: 'schematic-form', id: appIdentity, method:model[p].method || 'get', 'data-action': action}).get();

            // insert previously created table in form
            form.appendChild(tableDom);

            // now insert form element in panel body container
            container.appendChild(form);

            // insert panel container in panel body
            b.appendChild(container);

            // insert the panel body in main panel section
            d.appendChild(b);   


            // finish, whole main panel section in application dom
                       
            app.selector.appendChild(d);
        }
    }

    createField(field) {

        let trow = [field.name];

        let eleType = 'input';

        field.type = field.type || 'text';

        if (['text', 'password', 'file', 'email', 'tel', 'number'].indexOf(field.type) >= 0) {
            eleType = 'input';
            
        }

        if (field.type == 'textarea') {
            eleType = 'textarea';
        }
   

        if (field.type == 'checkbox' && field.options) {

            var ele = new element('div', {
                class:"group-checkbox"
            }).get();

            let options = {};

            if (field.options instanceof Array && field.options.length) {
                for (let a = 0; a < field.options.length; a++) {
                    options[field.options[a]] = field.options[a];
                }
            } else {
                options = field.options;
            }

                
            let objectKeys = Object.keys(field.options);
            for (let k of objectKeys) {

                let label = field.options[ k ];

                let labelEle = new element('label', {
                    class:"element-label " + (field.param_type || 'form') + ""
                }).text(label).get();

                 let inputEle = new element('input', {
                    type:'checkbox', 
                    name: k, 
                    "data-param-type": field.param_type || 'form',
                    class:"element " + (field.param_type || 'form') + ""
                }).get();

                 labelEle.appendChild(inputEle);

                 ele.appendChild(labelEle);
            }


        }

        if (field.type == 'radio' && field.options) {

            var ele = new element('div', {
                class:"group-radio"
            }).get();

          

           
            for (let k of field.options) {

                //let label = field.options[ k ];

                let labelEle = new element('label', {
                    class:"element-label " + (field.param_type || 'form') + ""
                }).text(k).get();

                 let inputEle = new element('input', {
                    type:'radio', 
                    name: field.name, 
                    value: k,
                    "data-param-type": field.param_type || 'form',
                    class:"element " + (field.param_type || 'form') + ""
                }).get();

                 labelEle.appendChild(inputEle);

                 ele.appendChild(labelEle);
            }


        }

        if (field.type == 'select' && field.options) {

            var ele = new element('select', {
                name: field.name, 
                "data-param-type": field.param_type || 'form',
                class:"element " + (field.param_type || 'form') + ""
            }).get();
          

           
            for (let k of Object.keys(field.options)) {
        
                let option = new element('option', {
                    value: k,                    
                }).text(field.options[k]).get();     

                 ele.appendChild(option);

            }


        }

        if (typeof ele == 'undefined') {

            var ele = new element(eleType, {
                    type:field.type, 
                    name: field.name, 
                    "data-param-type": field.param_type || 'form',
                    class:"element " + (field.param_type || 'form') + ""
                }).get();

        } 
        
        trow.push(ele);

        trow.push(field.description || '');
        trow.push(field.param_type || 'string');
        trow.push(field.data_type || 'string');

        return trow;

    }



}