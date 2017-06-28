import 'utility/global';
import 'utility/event';
import request from 'xhr/request';

import {providers as _registerProviders} from 'utility/registry';

import resolve from 'utility/container';

import element from 'dom/element';

import table from 'dom/table';

import application from './application';


_registerProviders([
	{provider:'element', factory: element},
	{provider:'table', factory: table}
]);

/*
request.get('http://192.168.1.128/mchool/').then(function (r) {
	console.log(r);
});*/


let _applications = {};

// create schematic
Object.assign(window, {
	schematic: {
		_modules:{}
	}
});


Object.assign(window.schematic, { 
	app (name, config) {

		if (typeof _applications[name] != 'undefined') {
			return _applications[name].instance;
		}

		let instance = new application(name, config);

		 _applications[name] = {name: name, booted: false, instance: instance};

		 return instance;
	},
	set(object, path, value) {

		
        var a = path.split('.');

        for (let i = 0; i < a.length - 1; i++) {
            var n = a[i];
            if (n in object) {
                object = object[n];
            } else {
                object[n] = {};
                object = object[n];
            }
        }
        object[a[a.length - 1]] = value;
    },
    get(object, path) {
        var o = object;
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');
        var a = path.split('.');
        while (a.length) {
            var n = a.shift();
            if (n in o) {
                o = o[n];
            } else {
                return;
            }
        }
        return o;
    }, 
    module(key) {

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

    	app.booted = true;

    	/*
    	 for (var i in applications[name]._services) {
            var service = applications[name]._services[i];
            service.init();
        }

        var model;

        if (model = element.getAttribute('data-model')) {
            draw(applications[name], applications[name]._models[model]);
        }
        */
    }

});

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