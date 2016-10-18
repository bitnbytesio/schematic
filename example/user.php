<?php 

header('Content-Type=> application/json'); 
echo json_encode([

    [

        'title'=> 'User Dashboard',

        'description'=> '',

        'action'=> '/user/dashboard',

        'method'=> 'get',

        'data'=> [

            [

                'type'=> 'text',

                'name'=> 'X-Access-Token',

                'description'=> 'Enter your api token',

                'param_type'=> 'header',

                'data_type'=> 'string',

                'required'=> true

            ],

            [

                'type'=> 'text',

                'name'=> 'with',

                'description'=> 'Enter comma seperated relations (organizations, questions, memberships, profile, profile.member, profile.address, profile.organization)',

                'param_type'=> 'form',

                'data_type'=> 'multi-string'

            ]

        ]

    ],
   
    [

        'title'=> 'Change Password',

        'description'=> 'Change password sample request (Note=> New api token will be issued upon success).',

        'action'=> '/user/change-password',

        'method'=> 'post',

        'data'=> [

            [

                'type'=> 'text',

                'name'=> 'X-Access-Token',

                'description'=> 'Enter your api token',

                'param_type'=> 'header',

                'data_type'=> 'string',

                'required'=> true

            ],

            [

                'type'=> 'password',

                'name'=> 'old_password',

                'description'=> 'Enter your old password',

                'param_type'=> 'form',

                'data_type'=> 'string',

                'required'=> true

            ],

            [

                'type'=> 'password',

                'name'=> 'new_password',

                'description'=> 'Enter your new password',

                'param_type'=> 'form',

                'required'=> true

            ],

            [

                'type'=> 'password',

                'name'=> 'new_password_confirmation',

                'description'=> 'Re-enter your new password',

                'param_type'=> 'form',

                'required'=> true

            ],



        ]

    ]

]);