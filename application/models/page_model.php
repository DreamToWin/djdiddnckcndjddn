<?php

class Page_Model extends MY_Model {

    protected $_table_name = 'page';
    protected $_primary_key = 'id';
    protected $_order_by = 'id';
    protected $_timestamps = FALSE;
    public $rules = array(
        'title' => array(
            'field' => 'title',
            'label' => 'Tiêu đề',
            'rules' => 'trim|required|min_length[3]|max_length[255]|callback__unique_name|xss_clean',
        ),
        'content' => array(
            'field' => 'content',
            'label' => 'content',
            'rules' => 'required|xss_clean|'
        )
    );

    public function __construct() {
        parent::__construct();
    }

    public function get_new() {
        $page = new stdClass();
        $page->title = '';
        $page->content = '';
        $page->status = 1;
        $page->comment = 1;
        $page->account_id = 0;
        return $page;
    }

    public function get_page() {
        $this->db->select('page.*, a.id, a.fullname as fullname');
        $this->db->join('account as a', 'page.account_id= a.id');
        $this->db->order_by('page.id');
        return parent::get_by(array('page.status' => 1));
    }

    public function getpage($slug, $single = TRUE) {
        $this->db->limit(1);
        return parent::get_by(array('slug' => $slug, 'status' => 1), $single);
    }

}

?>
