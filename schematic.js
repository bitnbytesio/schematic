 'use strict';
var schematic = (function () { 'use strict'

    var ver = '3.0';

    var applications = {};
    var registryCollection = {};

    var serviceProviders = {};


    function initialized(name, config) {

        this.name = name;
        this.dom = null;
        this.config = config;
        this._booted = false;
        this._models = {};
       
    }

    initialized.prototype.init = function (  obj ) {

       dependencyResolver( obj, getService, this );

    }; 

    initialized.prototype.model = function (name, object) {

        if (this.config.routable) console.info('Application will not use ['+name+'] model in routable mode.');

        this._models[name] = object;
        
    };


    // create new application
    function application(name, config) {

        if (typeof applications[name] !== 'undefined') return applications[name];

        return applications[name] = new initialized( name, config );
    }

    // dependency resolver
    function dependencyResolver( args, provider, extras ) {



        var injections = [];

        var func;

        for (var i in args) {

            var key = args[i]; 

             if (typeof key == 'function') {
                func = key;
            } else {

                injections.push( provider(key, extras) );
                
            }

        }

        if (typeof func != 'function') throw new Error('Invalid object in injector.');

        return func.apply(func, injections);

    }

    // dependency injector
    function dependencyInjector( args ) {

        return dependencyResolver(args, getModule);

    }

    // get module by key
    function getModule ( key ) {


        if (typeof key == 'string' && typeof registryCollection[key] != 'undefined') {
             
                if (typeof registryCollection[key] === 'function') {
                    var funcName = registryCollection[key.replace('@', '')];
                    return new registryCollection[key]();
                  
                } else {
                    return registryCollection[key];
                }
                
               
        } else {
            throw new Error('Unknown reference '+key+' in injector.');
        }

    }

    // get service provider by key
    function getService(key, extras) {


        
        if (typeof key == 'string' && typeof serviceProviders[key] != 'undefined') {

            if (typeof extras != 'undefined') {
                serviceProviders[key].app = extras;
            }

            return serviceProviders[key];
               
        } else {
            throw new Error('Unknown service provider '+key+' in injector.');
        }

    }

    // get dependency by key
    function getDependency(key) {

        if (key.indexOf('@') == 0) {
            return getModule(key);
        }

        if (key.indexOf('#') == 0) {
            return getService(key);
        }

        throw new Error('Invalid dependency ' + key + '.');

    }



    // collection object

    function registry( key, func ) {
        registryCollection['@' + key] = func;
    } 

    // service provider colections
    function registerServiceProvider( key, func ) {

        if (typeof func != 'function' && !(func instanceof Array) ) throw new Error('Invalid Service provider '+key+' found.'); 


        if (typeof serviceProviders[key] != 'undefined') throw new Error('Service provider with name '+key+' already exists.'); 

        if (func instanceof Array) {
            serviceProviders['#' + key] = dependencyResolver(func, getDependency);
        } else {
            serviceProviders['#' + key] = func();
        }
    }


    // information

    function infoAndAbout() {

    }

   

    function draw(app, model) {
        
        var $decorator = getModule('@decorator');

        for (var p in model) {

            var formId = app.name + ' ' + model[p].title;
            var appIdentity = formId.slug();


            var fields = model[p].data;

            var tbody = [];

            for (var iField in fields) {
                var field = fields[iField];

                var trow = [field.name];

                if (field.type == 'text' || field.type == 'password' || field.type == 'file' || field.type == 'email') {
                    var text = $decorator.element('input', {type:field.type, name: field.name}).get();
                    trow.push(text);
                }

                trow.push(field.description || '');
                trow.push(field.param_type || 'string');
                trow.push(field.data_type || 'string');

                tbody.push(trow);

            }

            var button = $decorator.element('button', {class:'schematic-btn', onclick:'', 'data-target':appIdentity }).text('Try Now').get();

            var t = $decorator.table({});
            
            t.header(['Parameter', 'Value', 'Description', 'Parameter Type', 'Data Type']);
            
            t.tbody(tbody);

            t.footer([{html: button, colSpan:5}], true);
            
            var table =  t.get();
            
            var method = $decorator.element('span', {class:'method'}).text((page[p].method || 'get')).get();
            var action = $decorator.element('span', {class:'action'}).text((page[p].action || '/')).get();

            var bar = $decorator.element('div', {class:'heading'}).text((page[p].title || '')).get();
            bar.appendChild(method);
            bar.appendChild(action);

            var d = $decorator.element('div', {class:'panel ' + (page[p].method || 'get') }).get();
            d.appendChild(bar);

            var b = $decorator.element('div', {class: 'body collapsey'}).get();

            var container = $decorator.element('div', {class: 'body-content'}).get();

            var form = $decorator.element('form', {class: 'schematic-form', id: appIdentity}).get();
            form.appendChild(table);

            container.appendChild(form);
            b.appendChild(container);

            d.appendChild(b);

            app.dom.appendChild(d);
        }

    }

    registry('stage', {draw: draw});

   
    // boot application by attributes
    document.addEventListener( "DOMContentLoaded", function(){
        document.removeEventListener( "DOMContentLoaded", this, false );

        for (var n in applications) {
            var nodList = document.querySelectorAll('[data-schematic="'+n+'"]');

            if (nodList.length) {

                 // in case of same application already exists   
                 if (nodList.length > 1 ) console.info('Duplicate application reference found in dom.');

                 run(n, nodList[0]);
            }
        }

    });

   
     // boot application
    function run( name, element ) {


        if (!(element instanceof Node)) throw new Error('Invalid application '+ name +' dom reference.');
        

        if (!applications[name] instanceof initialized) throw new Error("Application " + name + " doesn't exists.");
         
        if (applications[name]._booted) throw new Error('Application '+ name +' is already running.');

        element.setAttribute('class', (element.getAttribute('class') || '') + ' schematic-dom');

        applications[name].dom = element;

        applications[name]._booted = true;

        var model;

        if (model = element.getAttribute('data-model')) {
            draw(applications[name], applications[name]._models[model]);
        }
                
    }

    // return child scope objects
    return { app: application, info: infoAndAbout, injector: dependencyInjector, register: registry, boot: run, get: getModule, service: registerServiceProvider };

})();