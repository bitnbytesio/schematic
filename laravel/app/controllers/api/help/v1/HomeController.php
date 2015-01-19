<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\help\v1;

use View;

/**
 * Description of HelpController
 *
 * @author Harcharan Singh
 */
class HomeController extends \api\help\HelpController
{

    public function getIndex()
    {
        View::share('title', 'Justripe API V1.0');
        $this->layout->body = View::make('help.api.v1.index');
    }

}
