export default class response {

	constructor(xhr) {

		this.status = null;
		this.statusText = null;
		this.body = null;
		this.status = xhr.status;
		this.body = xhr.responseText;      

	}

	

}

