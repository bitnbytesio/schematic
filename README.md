# Schematic

Schematic is usefull in **rest api development**. it providing an easier and expressive way to create api help page. The schematic is specialy designed for [Laravel framework](http://laravel.com), but you can use it with any tool or even in core projects.

## Requirements

- JQuery >= 1.11
- Latest browser

## Features

- Classic and Simple design
- Light weight
- Data validation

## Code Examples

```javascript
// create page config
var config = {
                title: 'Schematic Api v1.2',
                description: 'World Open Source Development Association (WOSDA)',
                url: 'http://example.com/api/v1'
              };
              
Schematic.init(config);

// create page sections
var section1 = {
                  title: 'Login',
                  description: 'Login sample request',
                  action: '/login',
                  method: 'post',
                  data: [
                    {
                      type: 'email', name: 'email', decription: 'Enter your email', param_type: 'form', data_type: 'email'
                    },
                    {
                      type: 'password', name: 'password', decription: 'Enter your pasword', param_type: 'form', data_type: 'alpha_num'
                    },
                    {
                      type: 'options', name: 'role', decription: 'Select your role', param_type: 'form', data_type: 'numeric', 'options': { '1':'admin', '2':'editor', '3':'contributor' }
                    }
                  ]
                };
                
var section2 = {
                  title: 'Logout',
                  description: 'Logout sample request',
                  action: '/logout',
                  method: 'get',
                  data: [
                    {
                      type: 'text', name: 'key', decription: 'Enter your api key', param_type: 'form'
                    }
                  ]
                };

Schematic.create([section1, section2]);

// Note: same syntaxt ie is used in options filed should be on field type choice and multi-choise ('options': { '1':'admin', '2':'editor', '3':'contributor' })

```

# Data types: 


- email, int|numeric, float, alpha_num(accept underscore and aplha numeric charaters), alpha_dashnum (accept underscore, hyphen alpha numeric characters), alphadash (accepts alpha and - hyphen only), alpha_ (accepts alpha and underscore), alphanum (accepts alpha numeric characters only), alpha (accepts alphabets only), multi-int (accepts comma seperated numerics for eg: 1,2,3), multi-string (accepts comma seperateed for eg: apple,red,bucket ).


# Input Fields:

- options (for select element ie. dropdown )
- choice (for radio type input)
- multi-choice (for checkbox input type)
- text (for input type text)
- email (for input type email)
- file (for input type file)
- password (fo input type password)
- textarea (for textarea element)

## Contributing

Contributions to the **Schematic** are welcome.

Copyright 2015 [WOSD](http://facebook.com/)
