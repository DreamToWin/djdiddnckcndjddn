<?php

class Contact_Model extends MY_Model {

    protected $_table_name = 'contact';
    protected $_primary_key = 'id';
    protected $_order_by = 'id';
    public $rules = array(
        'name' => array(
            'field' => 'name',
            'label' => 'Tên của bạn',
            'rules' => 'trim|required|min_length[4]|max_length[60]|xss_clean'
        ),
        'email' => array(
            'field' => 'email',
            'label' => 'Địa chỉ email',
            'rules' => 'trim|required|min_length[6]|max_length[150]|email'
        ),
        'title' => array(
            'field' => 'title',
            'label' => 'Tiêu đề',
            'rules' => 'trim|required|min_length[5]|max_length[255]|xss_clean'
        ),
        'content' => array(
            'field' => 'content',
            'label' => 'Nội dung',
            'rules' => 'trim|required|min_length[20]|max_length[500]|xss_clean'
        ),
        'captcha' => array(
            'field' => 'captcha',
            'label' => 'Mã kiểm tra',
            'rules' => 'trim|required|numeric|callback__check_answer'
        )
    );
    public $rules_backend = array(
        'content' => array(
            'field' => 'content',
            'label' => 'Nội dung',
            'rules' => 'trim|required|min_length[20]|max_length[500]|xss_clean'
        )
    );

    function __construct() {
        parent::__construct();
    }

    function get_contact() {
        $contact = new stdClass();
        $contact->name = '';
        $contact->email = '';
        $contact->title = '';
        $contact->content = '';
        return $contact;
    }

    public function get_reply($id) {
        $this->_table_name = '';
        $this->_order_by = 'id';
        $this->db->select('reply_contact.* , fullname');
        $this->db->from('reply_contact');
        $this->db->join('account AS a', 'reply_contact.account_id = a.id');
        $this->db->limit(1);
        return parent::get_by(array('reply_contact.id_contact' => $id), FALSE);
    }

    public function remove_rep($id) {
        $this->_table_name = 'reply_contact';
        $this->db->where('id_contact',$id);
        return parent::delete('reply_contact');
    }

    public function savemessage($data) {
        $this->db->insert('reply_contact', $data);
    }

}

?>
