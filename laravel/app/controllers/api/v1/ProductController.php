<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\v1;

use Input;
use Product;
use Response;
use User;

/**
 * Description of ProductController
 *
 * @author Harcharan Singh
 */
class ProductController extends ApiController
{

    public function getAll()
    {
        $limit = Input::has('limit') ? Input::get('limit') : 15;
        $product = Product::where('visible', 1)->paginate($limit);
        $this->data = $product;
        return $this->response();
    }

    public function getView($id)
    {
        $product = Product::where('visible', 1)->find($id);
        if (!$product) {
            $this->addError('message', 'Product not found!');
            return $this->response(false);
        }
        $this->data = $product;
        return $this->response();
    }

    public function getBySlug($slug)
    {
        $product = Product::where('visible', 1)->where('slug', $slug)->first();
        if (!$product) {
            $this->addError('message', 'Product not found!');
            return $this->response(false);
        }
        $this->data = $product;
        return $this->response();
    }

    public function getComments($id)
    {
        $limit = Input::has('limit') ? Input::get('limit') : 15;
        $comments = \ProductComment::where('product_id', $id)->paginate($limit);
        $this->data = $comments;
        return $this->response();
    }

    public function postComment($id)
    {
        $comment = new ProductComment();
        $comment->content = Input::get('comment');
        $comment->product_id = $id;
        if ($comment->save()) {
            $this->data = $comment;
            return $this->response();
        }
        return $this->response(false, 500);
    }

}
