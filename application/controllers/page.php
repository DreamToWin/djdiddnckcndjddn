<?php

class Page extends Frontend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('page_model');
        $this->data['sidebar'] = 'adv';
    }

    function event($slug) {
        if ($slug != null) {
            $data = $this->page_model->getpage($slug);
            $this->data['event'] = $data;
            $this->data['title'] = $data->title;
            $this->data['description'] = $data->title;
            $this->template->build('frontend/page/event', $this->data);
        }
    }
    
    function about($slug){
       if ($slug != null) {
            $data = $this->page_model->getpage($slug);
            $this->data['about'] = $data;
            $this->data['title'] = $data->title;
            $this->data['description'] = $data->title;
            $this->template->build('frontend/page/about', $this->data);
        } 
    }

}
