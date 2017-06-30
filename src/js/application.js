class application {

	constructor(app, config) {

		this._models = {};
		this._providers = [];
		this._modules = {};
		
	}

	model(key, value) {
		this._models[key] = value;
	}

	module() {

	}

	providers(list) {
		this._providers = list;
	}

	

}



export default application;