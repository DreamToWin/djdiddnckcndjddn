<?php

class Faq_Model extends MY_Model {

    protected $_table_name = 'faq';

    public function __construct() {
        parent::__construct();
    }

    public function get_faq($id) {
        $this->db->limit(1);
        $this->db->where(array('id' => $id));
        return $faq = $this->db->get($this->_table_name)->row();
    }

    public function get_new() {
        $faq = new stdClass();
        $faq = $this->title = '';
        $faq = $this->content = '';
        return $faq;
    }

}

?>
