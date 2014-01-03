<?php

class GetVideo extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('statistics_view_model');
        $this->load->library('memcachedlib');
    }

    public function hot($limit = 12, $start = 0) {
        $this->memcachedlib->delete('list_video_hot');
        $data = $this->statistics_view_model->list_hot($limit, $start);
        $this->memcachedlib->add('list_video_hot', $data, 350);
    }

    public function news($limit = 16, $start = 0) {
        $this->memcachedlib->delete('list_video_new');
        $data = $this->statistics_view_model->list_new($limit, $start);
        $this->memcachedlib->add('list_video_new', $data, 350);
    }
    
    public function getAll(){
        $data = $this->memcachedlib->getAll();
        echo count($data);
        var_dump($data);
    }

}
