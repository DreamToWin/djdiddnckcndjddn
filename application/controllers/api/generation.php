<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . '/libraries/REST_Controller.php');

class Generation extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('api_model');
    }

    function video_get() {
        if (!$this->get('slug')) {
            $this->response(NULL, 400);
        }
        $slug = $this->get('slug');
        $limit = $this->get('limit');
        $video = $this->api_model->get_video_cate($slug, $limit);
        echo json_encode($video);
//        if ($video) {
//            $this->response($video, 400); // 200 being the HTTP response code
//        } else {
//            $this->response(array('error' => 'Không tìm thấy video'), 404);
//        }
    }

    function categories_get() {
        $categories = $this->api_model->get_category();
        if ($categories) {
            $this->response($categories, 200); // 200 being the HTTP response code
        } else {
            $this->response(array('error' => 'Không tìm thấy chuyên mục nào'), 404);
        }
    }

}
