'use strict';

 schematic.service('router', ['@xhr','@stage', function ($xhr, $stage) { 

 	var router = {};
 	
 	var routes = {};

 	var defaultPath = null;

 	var fetchMode = 'eager';

 	var url = '';
 	
 	var html5Mode = false;

 	router.url = function (u) {
 		url = u;
 	}

 	router.html5 = function () {

 		html5Mode = true;
 	};

 	router.fetchMode = function ( m ) {

 		if (['eager', 'lazy'].indexOf(m) < 0) throw new Error('Invalid fetch mode.');

 		fetchMode = m;

 	};

 	router.on = function (s, obj) {

 		routes[s] = obj;

 	};

 	router.default = function (s) {
 		defaultPath = s;
 	};

    router.test = function () {
        alert('router in...');
    };

    function handleRoute( k, r ) {

    	if (typeof r == 'string') {
    		var fullUri = r;

    		if (fullUri.indexOf('http') < 0) {
    			fullUri = url + r;
    		}

    		$xhr.create(fullUri).then(function (r) {

    			$stage.draw(router.app, r);

    		}).error(function (s,r) {

    		});
    	}
    	
    }

    document.addEventListener( "DOMContentLoaded", function(){
        document.removeEventListener( "DOMContentLoaded", this, false );

        window.onhashchange = function () {
        	var hash = window.location.hash.replace('#', '');

     		if (typeof routes[hash] != 'undefined') {
     			handleRoute(hash, routes[hash]);
     		} else if(defaultPath != null) {
     			window.location.hash = '#' + defaultPath;
     		}

        };
       
    });
         
     
    return router;  
       
}]);