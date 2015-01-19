<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\v1;

use Validator;
use Input;
use User;
use Auth;
use Response;

/**
 * @author Harcharan Singh
 */
class AuthController extends OpenApiController
{

    public function postLogin()
    {
        $valid = Validator::make(Input::all(), ['email' => 'required|email', 'password' => 'required']);
        if ($valid->fails()) {
            $this->errors = $valid->errors();
            return $this->response();
        }
        if (Auth::once(array('email' => Input::get('email'), 'password' => Input::get('password')))) {
            $user = User::where('email', Input::get('email'))->find(Auth::id());
            $user->auth_key = \Str::random(60);
            $user->save();
            $this->data = $user;
            return $this->response();
        }
        $this->addError('messages', 'Invalid username or password!');
        return $this->response();
    }
   
    public function getLogout()
    {
        $valid = Validator::make(Input::all(), ['email' => 'required|email', 'key' => 'required|alpha_num|min:40']);
        if ($valid->fails()) {
            $this->errors = $valid->errors();
            return $this->response(false);
        }
        $user_id = User::where(['auth_key' => Input::get('key'), 'email' => Input::get('email')])->pluck('id');
        if (!$user_id) {
            return Response::json(['success' => false, 'data' => [], 'errors' => ['message' => 'Invalid credentials!']], 401);
        }

        $user = User::find($user_id);
        $user->auth_key = null;
        if ($user->save()) {
            return $this->response();
        }

        $this->addError('messages', 'Failed to logout!');
        return $this->response();
    }

}
