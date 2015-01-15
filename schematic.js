/* 
 * @project Schematic
 * @version 1.0
 * @author Harcharan Singh
 * @git: https://github.com/artisangang/schematic
 */

if ("undefined" === typeof jQuery)
    throw new Error("Action Ajax JavaScript requires jQuery to work");

var Schematic = Schematic || {};
Schematic = {
    init: function(config) {
        this.__errors = [];
        this.config = {
            title: typeof config.title !== 'undefined' ? config.title : 'Schematic v1.0',
            description: typeof config.description !== 'undefined' ? config.description : 'Rest Api development',
            url: typeof config.url !== 'undefined' ? config.url : window.location,
            container: typeof config.container !== 'undefined' ? config.container : 'body'
        };
        window.onload = function() {
            Schematic.__createSchematicStage();
            $("#schematic").html(Schematic.__page);
            $(document).on('click', '.section-heading', function() {
                target = $(this).data('body');
                $(target).slideToggle();
            });
            $(document).on('click', '.try-it', function() {
                Schematic.__prepare($(this));
            });
        };
    },
    create: function(object) {
        dom = '<div class="sections">';
        dom += '<p>' + this.config.description + '</p>';
        for (section in object) {
            dom += this.__createDom(object[section], (section + 1));
        }
        dom += '<div>';
        this.__page = dom;
    },
    about: function() {
        alert('Schematic 1.0 \r\n Author: Harcharan Singh');
    },
    __createSchematicStage: function() {
        dom = '<div class="container-fluid" id="schematic-dom">';
        dom += '<div class="section page">';
        dom += '<div class="page-heading">' + this.config.title + '</div>';
        dom += '<div class="page-body" id="schematic">';
        dom += '</div></div></div>';
        $(this.config.container).html(dom);
    },
    __createDom: function(object, section) {
        method = (typeof object.method === 'undefined') ? 'get' : object.method;
        action = (typeof object.action === 'undefined') ? '' : object.action;
        dom = '<div class="section section-' + method + '">';
        dom += '<div class="section-heading" data-body="#section-' + section + '">' + object.title + '<span class="method">' + method + '</span><span class="action">' + object.action + '</span></div>';
        dom += '<div class="section-body" id="section-' + section + '">';
        dom += '<div class="pad-20">';
        dom += '<p><strong>Description: </strong>' + object.description + '</p>';
        dom += '<form id="form-' + section + '" data-method="' + method + '" data-action="' + action + '">';
        dom += "<table class='form-table'><tr><th>Parameters</th><th>Values</th><th>Description</th><th>Parameter Type</th><th>Data Type</th></tr>";
        for (elementIndex in object.data) {
            element = object.data[elementIndex];
            param_type = (typeof element.param_type === 'undefined') ? 'form' : element.param_type;
            data_type = (typeof element.data_type === 'undefined') ? 'string' : element.data_type;
            if (element.type === 'options') {
                dom += "<tr><td>";
                label = (typeof element.label !== "undefined") ? element.label : element.name;
                dom += "<label>" + label !== false ? label : '&nbsp;' + "</label>";
                dom += "</td>";
                dom += "<td>";
                dom += "<select data-type='" + data_type + "' class='form-component element " + param_type + "' name='" + element.name + "' id='" + element.name + "'>";
                for (optionIndex in element.options) {
                    option = element.options[optionIndex];
                    for (item in option) {
                        select = (item === element.default) ? 'selected' : '';
                        dom += "<option value='" + item + "' " + select + ">";
                        dom += option[item];
                        dom += "</option>";
                    }
                }
                dom += "</select>";
                dom += "</td><td>";
            }
            if (element.type === 'choice') {
                dom += "<tr><td>";
                label = (typeof element.label !== "undefined") ? element.label : element.name;
                dom += "<label>" + label !== false ? label : '&nbsp;' + "</label>";
                dom += "</td>";
                dom += "<td>";
                dom += "<div id='" + element.name + "'>";
                for (optionIndex in element.options) {
                    option = element.options[optionIndex];
                    for (item in option) {
                        value = option[item];
                        select = (value === element.default) ? 'checked' : '';
                        dom += "<div class='radio'>";
                        dom += "<input data-type='" + data_type + "' type='radio' class='element " + param_type + "' id='" + value + "' name='" + element.name + "' value='" + item + "' " + select + ">";
                        dom += value + "</div>";
                    }
                }
                dom += "</div>";
                dom += "</td><td>";
            }
            if (element.type === 'multi-choice') {
                dom += "<tr><td>";
                label = (typeof element.label !== "undefined") ? element.label : element.name;
                dom += "<label>" + label !== false ? label : '&nbsp;' + "</label>";
                dom += "</td>";
                dom += "<td>";
                dom += "<div id='" + element.name + "'>";
                for (optionIndex in element.options) {
                    option = element.options[optionIndex];
                    for (item in option) {
                        value = option[item];
                        select = (item === element.default) ? 'checked' : '';
                        dom += "<div class='checkbox'>";
                        dom += "<input data-type='" + data_type + "' class='element " + param_type + "' type='checkbox' id='" + value + "' name='" + value + "' value='" + item + "' " + select + ">";
                        dom += item + "</div>";
                    }
                }
                dom += "</div>";
                dom += "</td><td>";
            }
            if (element.type === 'text') {
                dom += "<tr><td>";
                label = (typeof element.label !== "undefined") ? element.label : element.name;
                dom += "<label>" + label !== false ? label : '&nbsp;' + "</label>";
                dom += "</td>";
                dom += "<td>";
                dom += "<input data-type='" + data_type + "' class='element form-component " + param_type + "' type='text' name='" + element.name + "' id='" + element.name + "'>";
                dom += "</td><td>";
            }
            if (element.type === 'email') {
                dom += "<tr><td>";
                label = (typeof element.label !== "undefined") ? element.label : element.name;
                dom += "<label>" + label !== false ? label : '&nbsp;' + "</label>";
                dom += "</td>";
                dom += "<td>";
                dom += "<input data-type='email' class='element form-component " + param_type + "' type='email' name='" + element.name + "' id='" + element.name + "'>";
                dom += "</td><td>";
            }
            if (element.type === 'file') {
                dom += "<tr><td>";
                label = (typeof element.label !== "undefined") ? element.label : element.name;
                dom += "<label>" + label !== false ? label : '&nbsp;' + "</label>";
                dom += "</td>";
                dom += "<td>";
                dom += "<input class='element form-component form' type='file' name='" + element.name + "' id='" + element.name + "'>";
                dom += "</td><td>";
            }
            if (element.type === 'password') {
                dom += "<tr><td>";
                label = (typeof element.label !== "undefined") ? element.label : element.name;
                dom += "<label>" + label !== false ? label : '&nbsp;' + "</label>";
                dom += "</td>";
                dom += "<td>";
                dom += "<input data-type='" + data_type + "' class='element form-component " + param_type + "' type='password' name='" + element.name + "' id='" + element.name + "'>";
                dom += "</td><td>";
            }
            if (element.type === 'textarea') {
                dom += "<tr><td>";
                label = (typeof element.label !== "undefined") ? element.label : element.name;
                dom += "<label>" + label !== false ? label : '&nbsp;' + "</label>";
                dom += "</td>";
                dom += "<td>";
                dom += "<textarea data-type='" + data_type + "' class='element form-component " + param_type + "' name='" + element.name + "' id='" + element.name + "'></textarea>";
                dom += "</td><td>";
            }
            description = (typeof element.description === 'undefined') ? '' : element.description;
            dom += description;
            dom += "</td><td>";
            dom += param_type;
            dom += "</td><td>";
            dom += data_type;
            dom += "</td></tr>";
        }
        dom += "<tr><th colspan='5'><button data-form='#form-" + section + "' type='button' class='try-it schematic-btn btn-" + method + "'>Try it!</button</th></tr>";
        dom += "</table></form><div class='response-container'></div></div></div></div>";
        return dom;
    },
    __injectParams: function(action, params) {
        var match = new RegExp("^{+[A-Za-z0-9_]+}+$", 'gm');
        action_array = action.split('/');
        build = "";
        param_index = 0;
        for (i = 1; i < action_array.length; i++) {
            if (match.test(action_array[i])) {
                build += "/" + params[param_index];
                param_index++;
            } else {
                build += "/" + action_array[i];
            }
        }
        return build;
    },
    __prepare: function(object) {

        query = '';
        target = $(object).data('form');
        use_form_object = $(target).data('method') === 'get' ? false : true;
        this.__object = target;
        $(target).find('.has-error').removeClass('has-error');
        $(target).find('.error').remove();
        items = $(target).find('.element').length;
        if (use_form_object) {
            formData = new FormData();
        } else {
            formData = {};
        }
        params = [];
        for (i = 0; i < items; i++) {
            element = $(target).find('.element')[i];
            name = $(element).attr('name');
            data_type = $(element).data('type') ? $(element).data('type') : 'string';
            required = $(element).attr('required') ? true : false;
            val = $(element).val();
            this.__validate(name, val, data_type, required);
            if ($(element).hasClass('form')) {
                if (use_form_object) {
                    formData.append(name, val);
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
        }
        if (this.__errors.length > 0) {
            this.__showErrors(target);
            return false;
        }
        action = $(target).data('action');
        if (params.length > 0) {
            action = this.__injectParams(action, params);
        }
        url = Schematic.config.url + action;
        method = $(target).data('method');
        query_string = (query.length < 0) ? false : query.substring(0, (query.length - 1));

        this.__sendRequest(url, method, formData, query_string, object, use_form_object);
    },
    __validate: function(name, value, type, is_required) {

        required = typeof is_required === 'undefined' ? false : is_required;
        if (required) {
            val_check = value.replace(/^\s+|\s+$/gm, '');
            if (val_check.length <= 0) {
                this.__errors.push({field: name, message: 'The ' + name + ' is required.'});
            }
        }
        switch (type) {
            case 'email':
                var email_pattren = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var match = new RegExp(email_pattren);
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' must be valid email.'});
                }
                break;
            case 'int':
            case 'numeric':
                var match = new RegExp("^[0-9]+$", 'gm');
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' must be valid numeric value.'});
                }
                break;
            case 'float':
                var match = new RegExp("^[0-9]+\.[0-9]+$", 'gm');
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' must be valid float value.'});
                }
                break;
            case 'alpha_num':
                var match = new RegExp("^[A-Za-z0-9_]+$", 'gm');
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' only conatiner alphanumeric characters.'});
                }
                break;
            case 'alpha_dashnum':
                var match = new RegExp("^[A-Za-z0-9-_]+$", 'gm');
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' only conatiner alphanumeric, underscore(_) or dash(-) characters.'});
                }
                break;
            case 'alphadash':
                var match = new RegExp("^[A-Za-z-]+$", 'gm');
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' only conatiner alpha or dash(-) characters.'});
                }
                break;
            case 'alpha_':
                var match = new RegExp("^[A-Za-z_]+$", 'gm');
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' only conatiner alpha or underscore(_) characters.'});
                }
                break;
            case 'alphanum':
                var match = new RegExp("^[A-Za-z0-9]+$", 'gm');
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' only conatiner alphanumeric characters.'});
                }
                break;
            case 'alpha':
                var match = new RegExp("^[A-Za-z]+$", 'gm');
                if (!match.test(value))
                {
                    this.__errors.push({field: name, message: 'The ' + name + ' only conatiner alpha characters.'});
                }
                break;
        }
    },
    __showErrors: function(form) {
        for (index in this.__errors) {
            error = this.__errors[index];
            input = $(form).find("#" + error.field);
            $(input).parent().addClass('has-error');
            $(input).after("<p class='error'>" + error.message + "</p>");
        }
        this.__errors = [];
    },
    __syntaxHighlight: function(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
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
    },
    __sendRequest: function(url, method, formdata, query_params, button, form_object) {
        $(button).html("<span class='ajax-loader'></span>");
        $(button).removeClass("try-it");
        query_string = (typeof query_params === 'undefined' || query_params === false) ? '' : "?" + query_params;
        if (!form_object) {
            content_type = true;
            process_data = true;
        } else
        {
            content_type = false;
            process_data = false;
        }
        $.ajax({
            url: url + query_string,
            type: method,
            data: formdata,
            contentType: content_type,
            processData: process_data
        }).done(function(response, status, xhr) {
            for (index in response.errors) {
                error = response.errors[index];
                input = $(Schematic.__object).find("#" + index);
                $(input).parent().addClass('has-error');
                $(input).after("<p class='error'>" + error + "</p>");
            }
            dom = '<div class="action-url"><strong>URL: </strong>' + url + query_string + '</div>';
            dom += '<div class="status-code"><strong>Status : </strong>' + xhr.status + '</div>';
            dom += '<div class="response-body"><pre>';
            dom += Schematic.__syntaxHighlight(JSON.stringify(response, null, 2));
            dom += '</pre></div>';
            container = $(Schematic.__object).next().html(dom);
            $(button).text('Try it!');
            $(button).addClass("try-it");
        }).fail(function(xhr, status, error) {
            response = xhr.responseJSON;
            dom = '<div class="action-url"><strong>URL: </strong>' + url + query_string + '</div>';
            dom += '<div class="status-code"><strong>Status : </strong>' + xhr.status + '</div>';
            dom += '<div class="response-body"><pre>';
            dom += Schematic.__syntaxHighlight(JSON.stringify(response, null, 2));
            dom += '</pre></div>';
            container = $(Schematic.__object).next().html(dom);
            $(button).text('Try it!');
            $(button).addClass("try-it");

        });
    }
};