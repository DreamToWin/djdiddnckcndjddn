<?php

class Search extends Frontend_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('search_model');
        $this->data['sidebar'] = 'cate';
    }
    

    function video($keyword = null, $page = 1) {
        if ($keyword != null) {
            $this->load->library('paginationlib');
            $count = $this->search_model->count_search_video($keyword);
            $pagingConfig = $this->paginationlib->initPagination('result/video/' . $keyword . '/', $count, 12, 4);
            $data = $this->search_model->search_video($keyword, $pagingConfig['per_page'], (($page - 1) * $pagingConfig['per_page']));
            $this->data['categories'] = $data;
            if (count($data) > 0) {
                $this->data['title'] = "Kết quả tìm kiếm: {$keyword}";
            } else {
                $this->data['title'] = 'Không tìm thấy Video nào';
            }
            $this->data['pagination'] = $this->pagination->create_links();
        } else {
            redirect('');
        }
        $this->data['description'] = 'Kết quả tìm kiếm Video';
        $this->template->build('frontend/category/index', $this->data);
    }

}
