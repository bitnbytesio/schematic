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
		
		// form element
		let form = this.selector.querySelector("#" + identity);

		let url = form.getAttribute('data-action');

		// get form method
		let method = form.getAttribute('method');

		// collection of params
		let params = {};

		// collection of query string
		let query = {};

		// colection of headers
		let headers = {};

		// custom form data object
		let formData = {
			append: function (key, value) {
				this[key] = value;
			}
		};

		// default form data object
		if (method != 'get') {
			formData = new FormData;
		}

		// remove error highlights
		let hasErrorElements = form.querySelectorAll('.has-error');

		if (hasErrorElements.length) {
			for (var i = 0; i < hasErrorElements.length; i++) {
			   hasErrorElements[i].classList.remove('has-error');
			}
		}


		// clear old errors
		let errorElements = form.querySelectorAll('.error');

		if (errorElements.length) {
			for (var i = 0; i < errorElements.length; i++) {
			   errorElements[i].outerHTML = '';
			}
		}

		// get all elements of current form
		let field = form.querySelectorAll('.element');

		if (field.length) {

			// loop through each element
			for (let i = 0; i<field.length; i++) {

				// current element in loop
				let ele = field[i];

				// current element value
				let value = ele.value;

				// get current element name
				let name = field[i].getAttribute('name');

				// current element type
				let ele_type = field[i].getAttribute('type');

				// current element data type
                let data_type = field[i].getAttribute('data-type') || 'string';

                // current element is required or not
            	let required = field[i].getAttribute('required') ? true : false;

            	// is current element choice type
            	let choice = (ele_type == 'checkbox' || ele_type == 'radio')  ? true : false;


            	if (choice) {
					if (!ele.checked) {
						continue;
					} 
				} 

				// current element is form input then insert it in form
				if ( ele.classList.contains('form') ) {
					formData.append(name, value);
				}


				// current element is path/parm input insert it in path or route params
				if ( ele.classList.contains('path') || ele.classList.contains('param') ) {
	                params[name] = value;
	            }

	            // current element is query input then add it to query string collection
	            if ( ele.classList.contains('query') ) {
	                query[name] = value;
	            }

	            // current element is header type then add it to headers collection
	            if ( ele.classList.contains('head') ) {
	                headers[name] = value;
	            }


			} // loop ends here
		}

		console.log(headers);
		console.log(params);
		console.log(query);		
		console.log(formData);

		console.log( schematic.injectUrl(url, params) );


	}

	

}



export default application;