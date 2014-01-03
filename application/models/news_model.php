<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class News_Model extends MY_Model {

    protected $_table_name = 'news';
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
        $news = new stdClass();
        $news->title = '';
        $news->summary = '';
        $news->content = '';
        $news->meta_title = '';
        $news->meta_description = '';
        $news->meta_keyword = '';
        $news->thumbnail = '';
        $news->post_date = '';
        $news->views = 0;
        $news->status = 1;
        return $news;
    }
    
    function count_news() {
        $result = $this->get_by(array('status =' => '1'), FALSE, TRUE);
        return count($result);
    }
    
    function get_news($limit, $start) {
        $this->db->limit($limit, $start);
        $this->db->order_by("id", "desc"); 
        return parent::get_by(array('status =' => ' 1'));
    }

}
