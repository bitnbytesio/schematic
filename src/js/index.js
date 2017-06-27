import 'utility/global';
import 'utility/event';
import request from 'xhr/request';

import {providers as _registerProviders} from 'utility/registry';

import resolve from 'utility/container';

import element from 'dom/element';

import table from 'dom/table';

_registerProviders([
	{provider:'element', factory: element}
]);

/*
request.get('http://192.168.1.128/mchool/').then(function (r) {
	console.log(r);
});*/

var t = resolve(table);

console.log(t);