<?php

class Faq extends Backend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('faq_model');
        $this->data['page'] = 'FAQ';
        $this->data['title'] = 'FAQ http://wwww.123xem.vn';
    }

    function index() {
        $this->data['faq'] = $this->faq_model->get_faq(1);
        $this->template->build('backend/faq/index', $this->data);
    }

    function save() {
        $data = $this->array_from_post(array('title', 'content'));
        $data['created_on'] = getNowTimestamp();
        $this->faq_model->save($data, 1);
        redirect('nevergiveup/faq');
    }
}

?>
