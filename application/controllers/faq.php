<?php

class FAQ extends Frontend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('faq_model');
        $this->data['title'] = 'FAQ - Câu hỏi câu trả lời';
    }

    public function index() {
        $this->data['title'] = 'FAQ';
        $data = $this->faq_model->get_faq(1);
        $this->data['faq'] = $data;
        $this->data['description'] = 'Dánh sách câu hỏi thường gặp';
        $this->template->build('frontend/faq/index', $this->data);
    }

}

?>
