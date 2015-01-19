<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\v1\schematic;

use Config;
use Response;

/**
 * Description of Schematic
 *
 * @author Harcharan Singh
 */
class Schematic
{

    public static function create($config, $data)
    {
        $config = json_encode($config);
        $sections = json_encode($data);
        $init = "Schematic.init(" . $config . ");\r\n";
        $sections = "Schematic.create(" . $sections . ");";
        return $init . $sections;
    }

    public static function serve($module)
    {
        $class = Config::get('api.' . $module);
        $object = new $class();
        $js = call_user_func([$object, '_init']);
        $response = Response::make($js, 200);
        $response->header('Content-Type', 'text/javascript');
        return $response;
    }

}
