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

		let params = {};

		let query = {};

		let headers = {};

		let formData = {
			append: function (key, value) {
				this[key] = value;
			}
		};

		if (method != 'get') {
			formData = new FormData;
		}

		// remove old errors
		let hasErrorElements = form.querySelectorAll('.has-error');

		if (hasErrorElements.length) {
			for (var i = 0; i < hasErrorElements.length; i++) {
			   hasErrorElements[i].classList.remove('has-error');
			}
		}

		let errorElements = form.querySelectorAll('.error');

		if (errorElements.length) {
			for (var i = 0; i < errorElements.length; i++) {
			   errorElements[i].outerHTML = '';
			}
		}

		let field = form.querySelectorAll('.element');

		if (field.length) {
			for (let i = 0; i<field.length; i++) {
				let ele = field[i];
				let value = ele.value;
				let name = field[i].getAttribute('name');

				let ele_type = field[i].getAttribute('type');

                let data_type = field[i].getAttribute('data-type') || 'string';
            	let required = field[i].getAttribute('required') ? true : false;

            	let choice = (ele_type == 'checkbox' || ele_type == 'radio')  ? true : false;


            	// validate each field here

            	if (choice) {
					if (!ele.checked) {
						continue;
					} 
				} 

				if ( ele.classList.contains('form') ) {
					formData.append(name, value);
				}

				if ( ele.classList.contains('path') ) {
	                params[name] = value;
	            }


	            if ( ele.classList.contains('query') ) {
	                query[name] = value;
	            }

	            if ( ele.classList.contains('head') ) {
	                headers[name] = value;
	            }


			}
		}

		console.log(headers);
		console.log(params);
		console.log(query);		
		console.log(formData);


	}

	

}



export default application;