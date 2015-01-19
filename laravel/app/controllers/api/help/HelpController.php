<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\help;

use View;

/**
 * Description of HelpController
 *
 * @author Harcharan Singh
 */
class HelpController extends \Controller
{

    protected $layout;

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {

        $this->layout = View::make('layouts.api');
    }

}
