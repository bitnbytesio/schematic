<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\v1;

use Response;

/**
 * Description of OpenApiController
 *
 * @author Harcharan Singh
 */
class OpenApiController extends \Controller
{

    protected $layout;
    protected $errors = [];
    protected $data = [];

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

}
