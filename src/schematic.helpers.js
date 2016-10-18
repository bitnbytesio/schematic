 'use strict';
 schematic.register('helpers', function () { 

    // convert string to slug
    String.prototype.slug = function () {
        return this.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }


    // convert object to html attributes
    this.toAttributes = function ( i, prefix ) {
        var attributes = [];
        Object.keys(i).map( function (k) {
            var k = (typeof prefix == 'string') ? prefix + k : k;
            attributes.push(prefix + '=' + i[k]);
        });

        return attributes.join(' ');
    }

    // serialize object to query string
    this.serializeToQS = function(data, prefix) {
      var str = [];

      for(var o in data) {
        if (data.hasOwnProperty(o)) {

          var k = prefix ? prefix + "[" + o + "]" : o, v = data[o];
          str.push(typeof v == "object" ?
           this.serializeToQS(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));

        }
      }
           
      return str.join("&");
    }

    
    return this;
       
});