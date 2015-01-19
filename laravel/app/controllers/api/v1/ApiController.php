<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\v1;

use Response;
use Validator;
use Input; 
use User;

/**
 * @author Harcharan Singh
 */
class ApiController extends \Controller
{

    protected $layout;
    protected $errors = [];
    protected $data = [];
    protected $user_id;

    public function __construct()
    {
        $this->beforeFilter('@verifyUser');
    }

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        $this->layout = null;
    }

    protected function addError($key, $message)
    {
        !is_array($message) ? $this->errors[$key] = [$message] : $this->errors[$key] = $message;
    }

    protected function response($success = true, $code = 200)
    {
        $success = !empty($this->errors) ? false : $success;
        $results = ['success' => $success, 'data' => $this->data, 'errors' => $this->errors];
        return Response::json($results, $code);
    }

    public function verifyUser($route, $request)
    {
        $valid = Validator::make(Input::all(), ['key' => 'required|alpha_num|min:40']);
        if ($valid->fails()) {
            return Response::json(['success' => false, 'data' => [], 'errors' => ['message' => 'Invalid credentials!']], 401);
        }
        $user_id = User::where('auth_key', Input::get('key'))->pluck('id');
        if (!$user_id) {
            return Response::json(['success' => false, 'data' => [], 'errors' => ['message' => 'Invalid credentials!']], 401);
        }
        $this->user_id = $user_id;
    }

}
