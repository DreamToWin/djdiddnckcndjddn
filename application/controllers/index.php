<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Index extends Frontend_Controller {

    public function __construct() {
        parent::__construct();
        $this->data['sidebar'] = 'home';
    }

    public function index() {
        $this->load->library('memcachedlib');
        $this->load->model('statistics_view_model');
        $vhots = $this->memcachedlib->get('list_video_hot');
        $vnews = $this->memcachedlib->get('list_video_new');
        
        
//        if (!empty($vhots)) {
//            $this->data['vhots'] = $vhots;
//        } else {
//            //$this->data['vhots'] = $this->statistics_view_model->list_hot(12, 0);
//        }
        
        if (!empty($vnews)) {
            $this->data['vnews'] = $vnews;
        } else {
            $this->data['vnews'] = $this->statistics_view_model->list_new(12, 0);
        }

        $this->data['description'] = "Chia sẻ Video HOT, Nóng nhất, Sướng nhất, Hài hước, Sexy, Shock, Hài tết 2014, Táo Quân - 123xem.vn";
        $this->template->build('frontend/index/index', $this->data);
    }
}
