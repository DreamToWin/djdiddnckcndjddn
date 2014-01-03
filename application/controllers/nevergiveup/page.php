<?php

class Page extends Backend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('page_model');
        $this->data['page'] = 'Page';
    }

    public function index() {
        $this->data['title'] = 'Quản lý trang';
        $this->data['pages'] = $this->page_model->get_by(array('status' => 1));
        $this->template->build('backend/page/index', $this->data);
    }

    public function trash() {
        $this->data['title'] = 'Danh sách thùng rác';
        $this->data['pages'] = $this->page_model->get_by(array('status' => 0));
        $this->template->build('backend/page/trash', $this->data);
    }

    public function recoverd($id) {
        $data['status'] = 1;
        $this->page_model->save($data, $id);
        redirect('nevergiveup/page');
    }

    public function delete($id) {
        $data['status'] = 0;
        $this->page_model->save($data, $id);
        redirect('nevergiveup/page');
    }

    public function edit($id = NULL) {
        $status = array(
            '1' => 'Kích hoạt',
            '2' => 'Không kích hoạt'
        );
        $comment = array(
            '1' => 'Đồng ý',
            '2' => 'Không đồng ý'
        );

        $this->data['status'] = $status;
        $this->data['comment'] = $comment;

        //Fetch a page or set a new on
        if ($id) {
            $data = $this->page_model->get_by(array('status' => 1, 'id' => $id), TRUE);
            $this->data['pages'] = $data;
            count($this->data['pages']) || $this->data['errors'][] = 'Không tìm thấy trang';
        } else {
            $this->data['pages'] = $this->page_model->get_new();
        }
        $rules = $this->page_model->rules;
        $this->form_validation->set_rules($rules);

        if ($this->form_validation->run() == TRUE) {
            $data = $this->array_from_post(array('title', 'content', 'comment', 'status'));
            $data['slug'] = toSlug($this->input->post('title'));
            $data['account_id'] = $this->session->userdata('id');
            $data['create_date'] = time();
            $this->page_model->save($data, $id);
            redirect('nevergiveup/page');
        }
        $this->template->build('backend/page/edit', $this->data);
    }

}
