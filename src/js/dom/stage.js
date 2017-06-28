@deps('element', 'table')
export default class draw  {

    constructor(model) {


        // get decorator module     
        var $decorator = getModule('@decorator');

        // loop throug the model
        for (var p in model) {

            // create unique id for the form element
            var formId = app.name + ' ' + model[p].title;
            var appIdentity = formId.slug();

            // get form fields from json
            var fields = model[p].data;

            var tbody = [];

            for (var iField in fields) {

                var field = fields[iField];

                var trow = [field.name];

                if (field.type == 'text' || field.type == 'password' || field.type == 'file' || field.type == 'email') {
                    var text = $decorator.element('input', {
                        type:field.type, 
                        name: field.name, 

                        class:"element " + (field.param_type || 'form') + ""
                    }).get();
                    trow.push(text);
                }

                trow.push(field.description || '');
                trow.push(field.param_type || 'string');
                trow.push(field.data_type || 'string');

                tbody.push(trow);

            }

            // create form submit or try now button
            var button = $decorator.element('button', {class:'schematic-btn', onclick:'schematic.tryNow("'+appIdentity+'")', 'data-target':appIdentity }).text('Try Now').get();

            // start creating table
            var t = $decorator.table({});
            
            // table header created
            t.header(['Parameter', 'Value', 'Description', 'Parameter Type', 'Data Type']);
            
            // insert data into table body    
            t.tbody(tbody);

            // create table footer
            t.footer([{html: button, colSpan:5}], true);
            
            // get table element instance
            var table =  t.get();
            
            // create span element to display request method in title bar
            var method = $decorator.element('span', {class:'method'}).text((model[p].method || 'get')).get();

            // create span element to display request path in title bar
            var action = $decorator.element('span', {class:'action'}).text((model[p].action || '/')).get();

            // create title bar
            var bar = $decorator.element('div', {class:'heading'}).text((model[p].title || '')).get();

            // insert method span element in bar
            bar.appendChild(method);

            // insert action span element in bar
            bar.appendChild(action);

            // create the main panel
            var d = $decorator.element('div', {class:'panel ' + (model[p].method || 'get') }).get();

            // insert bar init
            d.appendChild(bar);

            // create panel body
            var b = $decorator.element('div', {class: 'body collapsey'}).get();


            // create panel body container
            var container = $decorator.element('div', {class: 'body-content'}).get();

            // create form element
            var form = $decorator.element('form', {class: 'schematic-form', id: appIdentity}).get();

            // insert previously created table in form
            form.appendChild(table);

            // now insert form element in panel body container
            container.appendChild(form);

            // insert panel container in panel body
            b.appendChild(container);

            // insert the panel body in main panel section
            d.appendChild(b);   


            // finish, whole main panel section in application dom
                       
            app.dom.appendChild(d);
           
                
        }

    }