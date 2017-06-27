class registry {
    
    constructor() {
        this._collection = {ver:1};
    }       

    set(path, value) {

        return schematic.set(this._collection, path, value);
    }

    get(path, value) {

        return schematic.get(this._collection, path, value);
    }

   
}

const _registry = new registry;

export let set = function (key, val) {
	return _registry.set(key, val);
};
export let get = function (key, val) {
	return _registry.get(key, val);
};
export let providers = function () {
  
    let args = arguments[0];
	for (let i = 0; i < args.length; i++ ) {
    	_registry.set('$$$'+args[i].provider, args[i].factory);
    }
};

export default {set,get,providers};