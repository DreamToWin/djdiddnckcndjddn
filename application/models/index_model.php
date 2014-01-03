<?php

class Index_Model extends Frontend_Controller {

    protected $_table_name = 'video';
    protected $_order_by = 'post_date DESC';

    public function __construct() {
        parent::__construct();
    }

    function get_video($limit, $start) {
        $this->db->select('id, title, slug, video_id, post_date, status');
        $this->db->limit($limit, $start);
        $this->db->order_by($this->_order_by);
        $this->db->from($this->_table_name);
        $this->db->where('status != 4');
        $query = $this->db->get();
        return $query->result();
    }

}

?>
