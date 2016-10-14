var page = [

    {

        title: 'User Dashboard',

        description: '',

        action: '/user/dashboard',

        method: 'get',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'with',

                description: 'Enter comma seperated relations (organizations, questions, memberships, profile, profile.member, profile.address, profile.organization)',

                param_type: 'form',

                data_type: 'multi-string'

            }

        ]

    },

    {

        title: 'List Available Security Questions',

        description: '',

        action: '/user/security-questions',

        method: 'get',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

        ]

    },

    {

        title: 'List Available Memberships',

        description: '',

        action: '/user/memberships',

        method: 'get',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

        ]

    },

    {

        title: 'List Available Organizations',

        description: '',

        action: '/user/organizations',

        method: 'get',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

        ]

    },

    {

        title: 'User Radius',

        description: '',

        action: '/user/radius',

        method: 'post',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },
            {

                type: 'text',

                name: 'radius',

                description: 'Enter radius in number',

                param_type: 'form',

                data_type: 'int'

            }

        ]

    },

    {

        title: 'Change Password',

        description: 'Change password sample request (Note: New api token will be issued upon success).',

        action: '/user/change-password',

        method: 'post',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'password',

                name: 'old_password',

                description: 'Enter your old password',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'password',

                name: 'new_password',

                description: 'Enter your new password',

                param_type: 'form',

                required: true

            },

            {

                type: 'password',

                name: 'new_password_confirmation',

                description: 'Re-enter your new password',

                param_type: 'form',

                required: true

            },



        ]

    },



    {

        title: 'View Profile',

        description: 'Get user profile details sample request.',

        action: '/user/profile',

        method: 'get',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'with',

                description: 'Enter comma seperated relations (member,address,organization)',

                param_type: 'form',

                data_type: 'multi-string'

            }

        ]

    },

    {

        title: 'Update Profile',

        description: 'Update user profile sample request.',

        action: '/user/profile',

        method: 'post',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'firstname',

                description: 'Enter firstname of user',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'lastname',

                description: 'Enter lastname of user',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'email',

                name: 'email',

                description: 'Enter email of user',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'phone',

                description: 'Enter phone number of user (Phone numbers are always string, int used here for client side validation).',

                param_type: 'form',

                data_type: 'int',

                required: true

            },



            {

                type: 'text',

                name: 'security_question',

                description: 'Enter security question code (Check List available Security Questions api to get list of questions).',

                param_type: 'form',

                data_type: 'string'

            },

            {

                type: 'text',

                name: 'security_answer',

                description: 'Enter security answer (Field is required if security_question is present).',

                param_type: 'form',

                data_type: 'string'

            }

        ]

    },

    {

        title: 'Change Organization',

        description: 'Change user organization sample request.',

        action: '/user/change-organization',

        method: 'post',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'organization_id',

                description: 'Enter organization id (Check List available organization api to get list of organizations).',

                param_type: 'form',

                data_type: 'int',

                required: true

            },



            {

                type: 'text',

                name: 'refer_code',

                description: 'Enter refer code',

                param_type: 'form',

                data_type: 'string'

            }

        ]

    },

    {

        title: 'Upload/Change Profile Picture',

        description: 'Change or upload user profile picture sample request. To display image use this slug: /image/profile/{profile_picture}?size=100x100. Replace {profile_picture} with value returned by api in profile_picture for user. Size is optional.',

        action: '/user/profile-picture',

        method: 'post',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'file',

                name: 'picture',

                description: 'Max Size: 2MB. Supported Formats: jpg,jpeg,png Ratio: 1:1',

                param_type: 'form',

                data_type: 'file'

            }

        ]

    },

    {

        title: 'Change Address',

        description: 'Change address sample request.',

        action: '/user/address',

        method: 'post',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'address_1',

                description: '',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'address_2',

                description: '',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'city',

                description: '',

                param_type: 'form',

                required: true

            },

            {

                type: 'text',

                name: 'state',

                description: '',

                param_type: 'form',

                required: true

            },

            {

                type: 'text',

                name: 'country',

                description: '',

                param_type: 'form',

                required: true

            },

            {

                type: 'text',

                name: 'zipcode',

                description: '',

                param_type: 'form',

                required: true

            }



        ]

    },

    {

        title: 'Upgrade Membership',

        description: '.',

        action: '/user/upgrade/membership',

        method: 'post',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'firstname',

                description: 'Enter your firstname',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'lastname',

                description: 'Enter your lastname',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type:'options',

                options: ['visa', 'mastercard'],

                name: 'cc_type',

                description: 'Select card type',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'cc_no',

                description: 'Enter card number',

                param_type: 'form',

                data_type: 'string',

                required: true,

                value:'4148529247832259'

            },

            {

                type: 'text',

                name: 'expiry',

                description: 'Enter expiry date (02/2019)',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'cvv',

                description: 'Enter card CVV',

                param_type: 'form',

                data_type: 'string',

                required: true

            },

            {

                type:'options',

                options: ['free','gold', 'platinum'],

                name: 'membership',

                description: 'Choose membership',

                param_type: 'form',

                data_type: 'string',

                required: true

            }

        ]

    },

    {

        title: 'User Gifts',

        description: 'List user gifts sample request.',

        action: '/user/gifts',

        method: 'get',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },



            {

                type: 'text',

                name: 'limit',

                description: 'Set results limit. 20 is default.',

                param_type: 'form',

                data_type: 'int',

                value: 20

            },

            {

                type: 'options',

                options: ['title', 'id', 'amount'],

                name: 'order_by',

                description: '',

                param_type: 'form',

                data_type: 'string'

            },

            {

                type: 'options',

                options: ['asc', 'desc'],

                name: 'order',

                description: '',

                param_type: 'form',

                data_type: 'string'

            }



        ]

    },

    {

        title: 'Update Device Info',

        description: 'Update user device information in system.',

        action: '/user/update-device',

        method: 'post',

        data: [

            {

                type: 'text',

                name: 'X-Access-Token',

                description: 'Enter your api token',

                param_type: 'header',

                data_type: 'string',

                required: true

            },

            {

                type: 'text',

                name: 'device_id',

                description: 'Enter unique device id',

                param_type: 'form',

                required: true

            },

            {

                type: 'options',

                name: 'device_type',

                description: 'Choose device type android/ios',

                param_type: 'form',

                options: ['android', 'ios'],

                required: false

            },

            {

                type: 'text',

                name: 'push_token',

                description: 'Enter push token used for gcm/apns',

                param_type: 'form',

                required: true

            }

        ]

    },





];

