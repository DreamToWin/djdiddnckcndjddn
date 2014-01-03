<?php

class Genapi extends Frontend_Controller {

    public function __construct() {
        parent::__construct();
    }

    function index() {
        $this->load->helper('url');
        $this->load->view('frontend/api/testapi');
    }

    function getcate() {
        $c = json_decode(trim(file_get_contents(base_url().'api/generation/categories')), true);
        $this->data['json'] = $c;
        $this->template->build('frontend/api/category', $this->data);
    }

    function ajax_load_video_api() {
        $data = $this->array_from_post(array('slug','limit'));
        $slug = $data['slug'];
        $limit = $data['limit'];
        $v = json_decode(trim(file_get_contents(base_url().'api/generation/video/slug/' . $slug .'/limit/'.$limit)), true);
        $this->data['vjsons'] = $v;
        print_r(file_get_contents(base_url().'api/generation/video/slug/' . $slug .'/limit/'.$limit));
        $this->load->view('frontend/api/ajax_load_video_api', $this->data);
    }
}
