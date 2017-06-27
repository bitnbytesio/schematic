import {get as _getProvider } from 'registry';


export default function	resolve(cls) {
	var args =  [];
	
	var _d = _getProvider('$$' + cls.name);	

	for (let i = 0; i < _d.length; i++) {
		args.push( _getProvider( '$$$' + _d[i] ) );
	}

	return new cls(...args);
}

