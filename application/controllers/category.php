<?php

class Category extends Frontend_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('category_model');
        $this->data['sidebar'] = 'cate';
    }

    function index($slug = NULL, $page = 1) {
        if ($slug != null) {
            $this->load->library('paginationlib');
            $number = $this->category_model->count_cate_by_slug($slug);
            $count = $number->num_recoder;
            
            $pagingConfig = $this->paginationlib->initPagination('category/' . $slug . '/', $count, 12, 3);
            $data = $this->category_model->get_cate_by_slug($slug, $pagingConfig['per_page'], (($page - 1) * $pagingConfig['per_page']));
            $this->data['categories'] = $data;
            if (count($data) > 0) {
                $this->data['title'] = $data[0]->name;
            } else {
                $this->data['title'] = 'Chưa có dữ liệu';
            }
            $this->data['pagination'] = $this->pagination->create_links();
        } else {
            redirect('');
        }
        $this->data['description'] = 'Dánh sách các Video của chuyên mục';
        $this->template->build('frontend/category/index', $this->data);
    }
}

?>
