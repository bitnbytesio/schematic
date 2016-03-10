/* 
 * @project Schematic
 * @version 2.0
 * @author Harcharan Singh
 * @git: https://github.com/artisangang/schematic
 */

"use strict";

if ("undefined" === typeof jQuery)
    throw new Error("Schematic JavaScript requires jQuery to work");

var SchematicPlugin = SchematicPlugin || {};

function SchematicPlugin(config) {

    this._errors = [];

    this.config = {
        title: 'Schematic v2.0',
        url: window.location,
        api: window.location,
        description: 'Rest Api development',
        container: '#schematic-page',
        subTitle: 'Rest Api Guide'
    };

    this._menu = [];

    this._completed = function () {
    };

    this._components = {};

    this._rules = {};

    this._object = null;

    this._temp = {};

    this._dataTypes = ['multi-int', 'multi-string', 'alpha_num', 'alphadash', 'aplha_dashnum', 'alpha', 'alphanum', 'alpha_', 'alpha'];

    $.extend(this.config, config);

}

SchematicPlugin.prototype._createStage = function () {

    $("#brand-name").html(this.config.title);

    var dom = '<div class="container-fluid" id="schematic-dom">';
    dom += '<div class="section page">';
    dom += '<div class="page-heading">' + this.config.subTitle + '</div>';
    dom += '<div class="page-body" id="schematic">';
    dom += '</div></div></div>';
    $(this.config.container).html(dom);
}

SchematicPlugin.prototype._createMenu = function () {

    var dom = '<ul class="nav navbar-nav">';

    for (var index in this._menu) {
        var link = (typeof this._menu[index].href === 'undefined') ? '/' + this.slug(this._menu[index].label) : this._menu[index].href;
        dom += '<li><a href="' + this.config.url + link + '">' + this._menu[index].label + '</a></li>';
    }

    dom += '</ul>';
    $('#navbar').html(dom);
}

SchematicPlugin.prototype._createPage = function (page) {

    var pageSections = '';

    if (page.length >= 1) {

        for (var index in page) {
            var section = page[index];
            pageSections += this.comSection(section);
        }

    }

    $(document).find("#schematic.page-body").html(pageSections);

}

SchematicPlugin.prototype._loadPage = function (which) {

    var config = {
        url: this.config.url + which,
        success: function (o) {
            this._createPage(o)
        }
    };


}

SchematicPlugin.prototype._prepare = function (object) {

    var instance = this;

    var query = '';

    var target = $(object).data('form');

    var use_form_object = $(target).data('method') === 'get' ? false : true;

    this._object = target;

    $(target).find('.has-error').removeClass('has-error');

    $(target).find('.error').remove();

    var items = $(target).find('.element').length;

    var formData = {};

    var headers = {};

    if (use_form_object) {
        formData = new FormData();
    }

    var params = [];


    if (items >= 1) {

        for (var i = 0; i < items; i++) {

            var element = $(target).find('.element')[i];

            var name = $(element).attr('name');

            var data_type = $(element).data('type') ? $(element).data('type') : 'string';

            var required = $(element).attr('required') ? true : false;

            var chioce = $(element).attr('type') == 'checkbox' || $(element).attr('type') == 'radio' ? true : false;

            var val = $(element).val();

            var hasError = SchematicValidator.check(name, val, required, data_type, element);

            if (hasError !== false) {
                this._errors.push(hasError);
            }

            if (chioce) {
                if (!$(element).is(':checked')) {
                    continue;
                }
            }

            if ($(element).hasClass('form')) {

                if (use_form_object) {

                    if ($(element).attr('type') === 'file') {
                        formData.append(name, element.files[0]);
                    } else {
                        formData.append(name, val);
                    }

                } else {

                    formData[name] = val;

                }
            }


            if ($(element).hasClass('path')) {
                params.push(val);
            }
            if ($(element).hasClass('query')) {
                query += name + "=" + val + "&";
            }

            if ($(element).hasClass('header')) {
                headers[name] = val;
            }

        } // loop ends here
    } // items length condition


    if (this._errors.length > 0) {
        this._showErrors(target);
        return false;
    }

    var action = $(target).data('action');
    if (params.length > 0) {
        action = this._injectParams(action, params);
    }

    var url = instance.config.api + action;
    var method = $(target).data('method');

    var query_string = (query.length <= 0) ? false : query.substring(0, (query.length - 1));

    if (query_string !== false) {
        url += '?' + query_string;
    }

    this._sendRequest(url, method, formData, object, headers);

}

SchematicPlugin.prototype._sendRequest = function (url, method, formData, button, requestHeaders) {


    var instance = this;

    if (typeof instance._temp['xhr'] !== 'undefined' && instance._temp['xhr'] !== false) {
        alert("Application is busy please wait.");
    }

    var url = url;
    var method = method;
    var formData = formData;
    var button = button;


    var content_type = true;
    var process_data = true;

    if (formData instanceof FormData) {
        content_type = false;
        process_data = false;
    }


    $(button).removeClass("try-it");
    $(button).after('<span class="ajax-loader"></span>');

    instance._temp['button'] = button;

    var config = {
        url: url,
        method: method,
        data: formData,
        headers:requestHeaders,
        contentType: content_type,
        processData: process_data,
        success : function (response, status, xhr) {

            $(button).text('Try it!');
            $(button).addClass("try-it");
            $(button).parent().find('span.ajax-loader').remove();

            for (var index in response.errors) {
                var error = response.errors[index];
                var input = $(instance._object).find("#" + index);
                $(input).parent().addClass('has-error');
                $(input).after("<p class='error'>" + error + "</p>");
            }

            var dom = '<div class="action-url"><strong>URL: </strong>' + url + '</div>';
            dom += '<div class="status-code"><strong>Status : </strong>' + xhr.statusText + ' (' + xhr.status + ')</div>';
            dom += '<div class="response-body"><pre>';
            dom += instance._syntaxHighlight(JSON.stringify(response, null, 2));
            dom += '</pre></div>';
            var container = $(instance._object).next().html(dom);

        }
    };

    var xhr = instance._call(config);
    instance._temp['xhr'] = xhr;
    xhr.done(function (response, status, xhr) {

        instance._temp['xhr'] = false;


    }).fail(function (xhr, status, error) {

        $(button).text('Try it!');
        $(button).addClass("try-it");
        $(button).parent().find('span.ajax-loader').remove();

        instance._temp['xhr'] = false;

        var response = xhr.responseJSON;
        var dom = '<div class="action-url"><strong>URL: </strong>' + url + '</div>';
        dom += '<div class="status-code"><strong>Status : </strong>' + xhr.statusText + ' (' + xhr.status + ')</div>';
        //dom += '<div class="response-headers">' + xhr.getAllResponseHeaders() + '</div>';
        dom += '<div class="response-body"><pre>';
        dom += (typeof response === 'undefined') ? '' : instance._syntaxHighlight(JSON.stringify(response, null, 2));
        dom += '</pre></div>';
        var container = $(instance._object).next().html(dom);

    });


}

SchematicPlugin.prototype._call = function (config) {

    if (typeof this._temp['xhr'] !== 'undefined' && this._temp['xhr'] !== false) {
        this._temp['xhr'].abort();
    }

    var defaultConfig = {
        url: this.config.url,
        method: 'get',
        accepts: {text: "application/json"}
    };

    $.extend(defaultConfig, config);

    return $.ajax(defaultConfig);

}

SchematicPlugin.prototype._injectParams = function (action, params) {
    var match = new RegExp("^{+[A-Za-z0-9_-]+}+$", 'gm');
    var action_array = action.split('/');
    var build = "";
    var param_index = 0;
    for (var i = 1; i < action_array.length; i++) {
        if (match.test(action_array[i])) {
            build += "/" + params[param_index];
            param_index++;
        } else {
            build += "/" + action_array[i];
        }
    }
    return build.replace("//", "/");
}


SchematicPlugin.prototype._showErrors = function (target) {
    for (var index in this._errors) {
        var error = this._errors[index];

            var input = $(target).find("[name='" + error.field + "']");
            $(input).parent().addClass('has-error');
            $(input).after("<p class='error'>" + error.message + "</p>");

    }
    this._errors = [];
}

SchematicPlugin.prototype.extend = function (what, name, func) {

    if (what === 'component') {

        if (typeof func !== 'function') {
            throw new Error('Invalid component callback');
        }

        this._component['name'] = func;
    }

};

SchematicPlugin.prototype.comSection = function (section) {

    var sectionDefaults = {
        title: '',
        method: 'get',
        action: this.config.url,
        description: false,
        data: []
    };

    $.extend(sectionDefaults, section);

    var dom = '<div class="section section-' + sectionDefaults.method + '">';
    dom += '<div class="section-heading" data-body="#section-' + this.slug(sectionDefaults.title) + '">';
    dom += sectionDefaults.title + '<span class="method">' + sectionDefaults.method + '</span>';
    dom += '<span class="action">' + sectionDefaults.action + '</span></div>';
    dom += '<div class="section-body" id="section-' + this.slug(sectionDefaults.title) + '">';
    dom += '<div class="pad-20">';
    if (typeof sectionDefaults.description === 'string') {
        dom += '<p><strong>Description: </strong>' + sectionDefaults.description + '</p>';
    } else {
        dom += '<p>&nbsp;</p>';
    }

    dom += this.comForm(sectionDefaults);

    dom += '<div class="response-container"></div>';
    dom += '</div></div></div>';
    return dom;
}

SchematicPlugin.prototype.slug = function (title) {
    return title.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

SchematicPlugin.prototype.comTable = function (section) {

    var dom = '<table class="form-table"><thead>';
    dom += '<tr><th class="parameters">Parameters</th><th class="values">Values</th>';
    dom += '<th class="descriptions">Description</th><th class="parameter-types">Parameter Type</th>';
    dom += '<th class="data-types">Data Type</th></tr></thead><tbody>';

    if (section.data.length >= 1) {
        for (var index in section.data) {
            dom += this.comRow(section.data[index]);
        }
    }
    dom += '<tr><td colspan="5">';
    dom += '<button data-form="#form-' + this.slug(section.title) + '" type="button" class="try-it schematic-btn btn-' + section.method + '">Try it!</button</td></tr>';
    dom += '</tbody></table>';
    return dom;

}

SchematicPlugin.prototype.comForm = function (section) {

    var customMethods = ['put', 'delete'];
    var customMethod = (customMethods.indexOf(section.method) < 0) ? false : true;
    var method = 'get';
    if (customMethod) {
        customMethod = '<input type="hidden" name="_method" value="' + section.method + '">';
        method = 'post';
    } else {
        customMethod = '';
        method = section.method;
    }

    var dom = '<form id="form-' + this.slug(section.title) + '" data-method="' + method + '" data-action="' + section.action + '">';
    dom += customMethod;
    dom += this.comTable(section);
    dom += '</form>';

    return dom;
}

SchematicPlugin.prototype.comRow = function (element) {

    var defaultElement = {
        label: element.name,
        type: 'text',
        description: '',
        param_type: 'form',
        data_type: 'string',
        required: false,
        value: ''
    };

    $.extend(defaultElement, element);

    var dom = '<tr><td>' + this.createElement('label', defaultElement);
    dom += '</td>';
    dom += '<td>' + this.createElement(defaultElement.type, defaultElement);
    dom += '</td><td>';

    var description = (typeof defaultElement.description === 'string') ? defaultElement.description : '';
    dom += description;
    dom += "</td><td>";
    dom += defaultElement.param_type;
    dom += "</td><td>";

    var string_type = this._dataTypes;
    dom += (string_type.indexOf(defaultElement.data_type) < 0) ? defaultElement.data_type : 'string';
    dom += "</td></tr>";

    return dom;
}

SchematicPlugin.prototype.createElement = function (type, element) {

    if (this._components[type] === 'function') {
        return this._components[type](element);
    }

    var defaultComponents = {
        comLabel: function (element) {
            var label = '';

            if (element.label === false) {
                label = '&nbsp';
            } else {
                label = (typeof element.label === "string") ? element.label : element.name;
            }

            if (element.required === true) {
                label += "<span class='required'>*</span>";
            }
            label = "<label>" + label + "</label>";

            return label;
        },
        comInput: function (element) {

            var required = (element.required === true) ? 'required' : '';
            return '<input data-type="' + element.data_type + '" class="element form-component ' + element.param_type + '" type="' + element.type + '" name="' + element.name + '" id="' + element.id + '" value="' + element.value + '"  ' + required + '>';
        },

        comOptions: function (element) {

            var required = (element.required === true) ? 'required' : '';
            var dom = '<select data-type="' + element.data_type  + '" class="element form-component ' + element.param_type + '"  name="' + element.name + '" id="' + element.id + '" ' + required + '>';

            if (typeof element.options !== 'undefined' && element.options.length > 0) {



                for (var index in element.options) {

                    if (typeof element.labeled !== 'undefined') {

                        dom += '<option value="' + element.options[index].value + '">' + element.options[index].label + '</option>';

                    } else {
                        dom += '<option value="' + element.options[index] + '">' + element.options[index] + '</option>';

                    }

                }
            }

            dom += '</select>';

            return dom;

        }
    };

    var func = 'com' + type.ucfirst();

    if (typeof defaultComponents[func] === 'function') {
        return defaultComponents[func](element);
    }

    return defaultComponents.comInput(element);

}

SchematicPlugin.prototype.menu = function (menu) {

    this._menu = menu;

};

SchematicPlugin.prototype._syntaxHighlight = function (json) {

    if (typeof json === 'undefined') {
        return;
    }

    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
SchematicPlugin.prototype.init = function (page) {

    this._createStage();
    this._createMenu();

    this._createPage(page);

    var instance = this;

    $(document).on('click', '.section-heading', function () {
        var target = $(this).data('body');
        $(target).slideToggle();
    });

    $(document).on('click', '.try-it', function () {
        instance._prepare(this);
    });

   /* $("#navbar").on('click', 'a', function (e) {
        var link = $(this).attr('href');
        link = link.replace(/^#/, '');
        alert(link);
    });*/

};

String.prototype.ucfirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var SchematicValidator = {

    check: function (name, value, required, data_type, element) {
        var error = false;

        var val_check = value.replace(/^\s+|\s+$/gm, '');

        if (required === true) {
            if (val_check.length <= 0) {
                error = {field: name, message: 'The ' + name + ' is required.'};
                return error;
            }
        }

        if (val_check.length <= 0) {
            return false;
        }

        var rule = 'check' + data_type.ucfirst();

        if (typeof this[rule] === 'function') {
            return this[rule](name, value, data_type, element);
        }

        return error;
    },

    checkEmail: function (name, value, data_type, element) {
        var error = false;
        var email_pattren = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var match = new RegExp(email_pattren);
        if (!match.test(value)) {
            error = {field: name, message: 'The ' + name + ' must be valid email.'};
        }

        return error;
    },

    checkInt: function (name, value, data_type, element) {
        var error = false;
        var match = new RegExp("^[0-9]+$", 'gm');
        if (!match.test(value)) {
            error = {field: name, message: 'The ' + name + ' must be valid integer value.'};
        }
        return error;
    },

    checkFloat: function (name, value, data_type, element) {
        var error = false;
        var match = new RegExp("^[0-9]+\.[0-9]+$", 'gm');
        if (!match.test(value)) {
            error = {field: name, message: 'The ' + name + ' must be valid float value.'};
        }
        return error;
    }


};

