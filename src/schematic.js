 'use strict';
var schematic = (function () {

    // application version
    var ver = '3.0';

    // collection of application created by user
    var applications = {};

    // collection of registered objects, plugins
    var registryCollection = {};

    // collection of service providers
    var serviceProviders = {};


    // main application constructor
    function initialized(name, config) {

        // store name of the application
        this.name = name;

        // element in which application will be displayed
        this.dom = null;

        // application config
        this.config = config;

        // booted will set to true, after application configured and ready to use
        this._booted = false;

        // collection of models used in application
        this._models = {};

        // collection of service providers used in application, later we will boot all service providers once application is ready
        this._services = [];
       
    }

    // all service providers will be configured in this container
    initialized.prototype.init = function (  obj ) {

        // resolve container dependency
       dependencyResolver( obj, getService, {app: this} );

    }; 


    // method is used to register model
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

        // collection of known objects, found in registery
        var injections = [];

        var func;


        // loop through dependency array
        for (var i in args) {

            var key = args[i]; 

            // pluck the function from dependency array
            if (typeof key == 'function') {
                func = key;
            } else {
                // save current dependency in collection
                injections.push( provider(key, extras) );
                
            }

        }

        if (typeof func != 'function') throw new Error('Invalid object in injector.');

        // call plucked function with all dependencies 
        return func.apply(func, injections);

    }

    // module dependency injector
    function dependencyInjector( args ) {

        // calling dependency resolver with module provider
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

        var service;
        
        if (typeof key == 'string' && typeof serviceProviders[key] != 'undefined') {

                       
            var func = serviceProviders[key];

            if (func instanceof Array) {
                service = dependencyResolver(func, getDependency);
            } else {
                service = func();
            }

            service.meta = extras;

            // save service provider in current app collection to boot it later when application is ready
            extras.app._services.push(service);
            
            return service;            
               
        } 

        throw new Error('Unknown service provider '+key+' in injector.');
        

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

        serviceProviders['#' + key] = func;

        
    }


    // draw application in its dom element. this is the main method that converts json into html
    function draw(app, model) {

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
                    var text = $decorator.element('input', {type:field.type, name: field.name}).get();
                    trow.push(text);
                }

                trow.push(field.description || '');
                trow.push(field.param_type || 'string');
                trow.push(field.data_type || 'string');

                tbody.push(trow);

            }

            // create form submit or try now button
            var button = $decorator.element('button', {class:'schematic-btn', onclick:'', 'data-target':appIdentity }).text('Try Now').get();

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

    // register application creator or drawer
    registry('stage', {draw: draw});

   
    // boot application by attributes
    document.addEventListener( "DOMContentLoaded", function(){
        document.removeEventListener( "DOMContentLoaded", this, false );

        for (var n in applications) {
            var nodList = document.querySelectorAll('[data-schematic="'+n+'"]');

            if (nodList.length) {

                 // in case of same application already exists   
                 if (nodList.length > 1 ) console.info('Duplicate application reference found in dom.');

                 // lets fire
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

        for (var i in applications[name]._services) {
            var service = applications[name]._services[i];
            service.init();
        }

        var model;

        if (model = element.getAttribute('data-model')) {
            draw(applications[name], applications[name]._models[model]);
        }
                
    }

    // return child scope objects
    return { app: application, injector: dependencyInjector, register: registry, boot: run, get: getModule, service: registerServiceProvider };

})();