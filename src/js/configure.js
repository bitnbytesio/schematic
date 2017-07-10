import {providers as _registerProviders} from 'utility/registry';
import application from './application';
import element from 'dom/element';
import draw from 'dom/stage';
let _applications = {};

// create schematic
Object.assign(window, {	
	schematic: {
		_modules:{}
	}
});


export default function boot() {
	Object.assign(window.schematic, { 
    app (name, config) {

        if (typeof _applications[name] != 'undefined') {
            return _applications[name].instance;
        }

        let instance = new application(name, config);

         _applications[name] = {name: name, booted: false, instance: instance};

         return instance;
    },
    module(key) {

    },

    tryNow(name, identity) {
    	 if (typeof _applications[name] != 'undefined') {
    	 	_applications[name].instance.tryNow(identity);
    	 }
    },

    injectUrl(url, values) {
   

        for (let key of Object.keys(values)) {

        	url = url.replace(':'+key, values[key]);
           
        }

        return url;

    },

    boot(app, element) {


	        if (!(element instanceof Node)) {
	            throw new Error('Invalid application '+ app.name +' dom reference.');
	        }

	        if ( !(app.instance instanceof application) ) {
	            throw new Error("Invalid application " + app.name + ".");
	        }
	        
	        if (app.booted) {
	            throw new Error('Application '+ name +' is already up and running.');
	        }

	        element.setAttribute('class', (element.getAttribute('class') || '') + ' schematic-dom');
	            
	        app.selector = element;

	        app.instance.selector = element;

	        app.booted = true;

	        /*
	         for (var i in applications[name]._services) {
	            var service = applications[name]._services[i];
	            service.init();
	        }

	        var model;
	        */

	        let model = element.getAttribute('data-model')

	        if (model) {

	            let stage = new draw(app);

	            if (typeof app.instance._models[model] == 'undefined') {

			        throw new Error("Invalid model " + model + ".");
			    }

	            stage.get(app.instance._models[model]);
	            
	        }
        
    	}
	});

	_registerProviders([
	    {provider:'element', factory: element},
	]);

	// boot application by attributes
	document.addEventListener( "DOMContentLoaded", function(){
	    document.removeEventListener( "DOMContentLoaded", this, false );

	    for (var n in _applications) {
	        var nodList = document.querySelectorAll('[data-schematic="'+n+'"]');

	        if (nodList.length) {

	             // in case of same application already exists   
	             if (nodList.length > 1 ) console.info('Duplicate application reference found in dom.');

	             // lets fire
	             schematic.boot( _applications[n], nodList[0] );
	        }
	    }

	});
}