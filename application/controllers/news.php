<?php

class News extends Frontend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('news_model');
        $this->data['sidebar'] = 'adv';
    }

    function index($page = 1) {
        $this->load->library('paginationlib');
        $count = $this->news_model->count_news();
        $pagingConfig = $this->paginationlib->initPagination('news/page', $count, 1, 3);
        $data = $this->news_model->get_news($pagingConfig['per_page'], (($page - 1) * $pagingConfig['per_page']));
        $this->data['news'] = $data;
        $this->data['pagination'] = $this->pagination->create_links();
        $this->data['description'] = 'Tin tức mới nhất, HOT nhất, giật gân nhất từ 123xem.vn!';
        $this->template->build('frontend/news/index', $this->data);
    }

    function detail($id) {
        $data = $this->news_model->get($id);
        if (count($data)) {
            $this->data['new'] = $data;
            $this->data['image'] = site_url($data->thumbnail);
            $this->data['title'] = $data->meta_title;
            $this->data['description'] = $data->meta_description;
            $this->template->build('frontend/news/detail', $this->data);
        } else {
            redirect('error/404.html');
        }
    }

}
