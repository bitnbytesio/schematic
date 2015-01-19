<?php
/*
 * @project Schematic
 * @version 1.0
 * @email artisangang@gmail.com
 * @git https://github.com/artisangang/
 */
namespace api\v1;

use Input;
use Blog;
use Upload;

/**
 * Description of BlogController
 *
 * @author Harcaharan Singh
 */
class BlogController extends ApiController
{

    public function getAll()
    {
        $blog = Blog::where(['user_id' => $this->user_id])->paginate(30);
        $this->data = $blog;
        return $this->response();
    }

    public function postWrite()
    {
        $valid = \Validator::make(Input::all(), Blog::rules());

        if ($valid->fails()) {
            $this->errors = $valid->errors();
            return $this->response();
        }
        $blog = new Blog();
        try {
            \DB::transaction(function() use($blog) {

                $image = Upload::image(Input::file('image'), ['resize' => true, 'path' => 'blog']);
                if (!$image) {
                    Session::flash('message', ['text' => 'Unable to upload image', 'class' => 'alert-danger']);
                    throw new \Whoops\Exception\ErrorException('Unable to upload image');
                }
                $blog->user_id = $this->user_id;
                $blog->title = Input::get('title');
                $blog->summary = Input::get('summary');
                $blog->content = Input::get('content');
                $blog->image = $image;
                $blog->thumb = $image;
                if (!$blog->save()) {
                    Upload::delete($image, 'blog');
                    Session::flash('message', ['text' => 'Unable to create blog', 'class' => 'alert-danger']);
                    throw new \Whoops\Exception\ErrorException('Unable to upload image');
                }
                $tags = explode(',', Input::get('tags'));
                $ftags = [];
                foreach ($tags as $tag) {
                    $ftags[] = \BlogTag::firstOrCreate(['name' => $tag]);
                }

                foreach ($ftags as $item) {
                    $post_tags = new \BlogPostTag();
                    $post_tags->blog_id = $blog->id;
                    $post_tags->tag_id = $item->id;
                    $post_tags->save();
                }
            });
        } catch (\Exception $e) {
            $message = ['text' => 'Unable to create blog', 'class' => 'alert-danger'];
            if (Session::has('message')) {
                $message = Session::get('message');
            }
            $this->addError('message', Session::get('message.text'));
            return $this->response(false, 500);
        }
        $this->data = $blog;
        return $this->response();
    }

}
