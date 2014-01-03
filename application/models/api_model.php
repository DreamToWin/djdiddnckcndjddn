<?php

class Api_Model extends MY_Model {

    protected $_table_name = 'category';
    protected $_order_by = 'id';
    protected $_primary_key = 'id';

    public function get_category() {
        $this->db->select('id, name, slug');
        return parent::get();
    }

    public function get_video_cate($slug, $limit) {
        $this->_table_name = '';
        $this->db->select('v.`id` , v.`title` , v.`slug` , v.`video_id`');
        $this->db->from('video AS v');
        $this->db->join('category AS c', 'v.category_id = c.`id` ');
        $this->db->limit($limit);
        return parent::get_by(array('c.`slug`' => $slug, 'v.status !=' => ' 4'), FALSE, FALSE);
    }

}
