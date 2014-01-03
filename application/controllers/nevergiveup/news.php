<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class News extends Backend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('news_model');
        $this->data['page'] = 'News';
    }

    public function index() {
        $this->data['title'] = 'Quản lý tin tức';
        $this->data['news'] = $this->news_model->get_by(array('status' => 1));
        $this->template->build('backend/news/index', $this->data);
    }

    public function edit($id = NULL) {
        try {
            $status = array(
                '1' => 'Kích hoạt',
                '2' => 'Không kích hoạt'
            );

            $this->data['status'] = $status;
            //Fetch a page or set a new on
            if ($id) {
                $data = $this->news_model->get_by(array('status' => 1, 'id' => $id), TRUE);
                $this->data['news'] = $data;
                count($this->data['news']) || $this->data['errors'][] = 'Không tìm thấy trang';
            } else {
                $this->data['news'] = $this->news_model->get_new();
            }
            $rules = $this->news_model->rules;
            $this->form_validation->set_rules($rules);

            if ($this->form_validation->run() == TRUE) {

                $upload = $this->do_upload();
                if (!empty($upload)) {
                    $data = $this->array_from_post(array('title', 'content', 'summary', 'status', 'meta_title', 'meta_description', 'meta_keyword', 'post_date'));
                    $data['post_date'] = time();
                    $data['thumbnail'] = 'publics/news/' . $upload['file_name'];
                    $this->news_model->save($data, $id);
                    redirect('nevergiveup/news');
                }
            }
            $this->template->build('backend/news/edit', $this->data);
        } catch (Exception $ex) {
            $this->log->write_log($ex->getMessage());
        }
    }

    public function delete($id) {
        $data['status'] = 0;
        $this->page_model->save($data, $id);
        redirect('nevergiveup/page');
    }

    function do_upload() {
        $config['upload_path'] = PUBLICSPATH . 'news/';
        $config['allowed_types'] = 'gif|jpg|png';
        $this->load->library('upload', $config);
        $this->upload->do_upload('thumbnail');
        return $this->upload->data();
    }

}
