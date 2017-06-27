
export default class memory { 

    constructor() {
        this._date = {};
        this.timeout = 600; // in seconds
    }
   
    remove(url) {
        delete this._data[url];
    }

    //a cached version exists
    exist(key) {
        return !!this._data[key] && ((new Date().getTime() - this._data[key]._) < this.timeout);
    }

    get(key) {
        return this._data[key].data;
    }

    set(key, value) {

        this.remove(key);

        this._data[key] = {
            _: new Date().getTime(),
            data: value
        };

    }        

 }
