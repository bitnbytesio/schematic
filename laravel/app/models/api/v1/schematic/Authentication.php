<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\v1\schematic;

use URL;

/**
 * Description of Authentication
 *
 * @author Harcharan Singh
 */
class Authentication
{

    public function _init()
    {
        $config = [
            'title' => 'Justripe API v1.0',
            'description' => 'Authentication',
            'url' => URL::to("/api/v1/auth"),
            'container' => '#schematic-container'
        ];

        $login = [
            'title' => 'Login',
            'description' => 'Login example',
            'action' => '/login',
            'method' => 'post',
            'data' => [
                ['type' => 'email', 'name' => 'email', 'description' => 'Enter user registered email', 'param_type' => 'form', 'data_type' => 'email'],
                ['type' => 'password', 'name' => 'password', 'description' => 'Enter user password', 'param_type' => 'form']
            ]
        ];

        $logout = [
            'title' => 'Logout',
            'description' => 'logout example',
            'action' => '/logout',
            'method' => 'get',
            'data' => [
                ['type' => 'email', 'name' => 'email', 'description' => 'Enter user registered email', 'param_type' => 'form', 'data_type' => 'email'],
                ['type' => 'text', 'name' => 'key', 'description' => 'Enter your authentication key', 'param_type' => 'query', 'required' => true]
            ]
        ];

        return Schematic::create($config, [$login, $logout]);
    }

}
