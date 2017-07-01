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

	tryNow(identity) {
		
		var form = this.selector.querySelector("#" + identity);
		let method = form.getAttribute('method');

		let hasErrorElements = form.querySelector('.has-error');

		for (var i = 0; i < hasErrorElements.length; i++) {
		   hasErrorElements[i].classList.remove('has-error');
		}

		let errorElements = form.querySelector('.error');

		for (var i = 0; i < errorElements.length; i++) {
		   errorElements[i].outerHTML = '';
		}

	}

	

}



export default application;