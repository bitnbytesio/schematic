# Schematic (Alpha 1)

Schematic is usefull in **rest api development**. it providing an easier and expressive way to create api help page. 

## Requirements

- JQuery >= 1.11
- Latest browser

## Features

- Classic and Simple design
- Light weight
- Data validation

## Code Examples

```javascript

var page = [

    {
        title: 'Login',
        description: 'Login sample request',
        action: '/auth/login',
        method: 'post',
        data: [
            {
                type: 'email',
                name: 'email',
                description: 'Enter your email',
                param_type: 'form',
                data_type: 'email',
                required: true
            },
            {
                type: 'password',
                name: 'password',
                description: 'Enter your password',
                param_type: 'form',
                required: true
            }

        
        ]
    },

    {
        title: 'Register',
        description: 'Create a new account',
        action: '/auth/register',
        method: 'post',
        data: [
            {
                type: 'email',
                name: 'email',
                description: 'Enter your email',
                param_type: 'form',
                data_type: 'email',
                required: true
            },
            {
                type: 'password',
                name: 'password',
                description: 'Enter your password',
                param_type: 'form',
                required: true
            }
        ]
    },

   

   


];



// create page config
  var schematic = new SchematicPlugin({
        title: "Schematic v2.0",
        url: "http://localhost/schematic",
        api: "http://localhost/api",
        subTitle: "Api Documentation"
    });

    schematic.init(page);


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


Copyright 2015 [WOSD](http://facebook.com/)
