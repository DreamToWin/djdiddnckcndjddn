<?php

class Chanel_Model extends MY_Model {
    protected $_table_name = 'subscribe_chanel';
    protected $_order_by = 'id';
    protected $_primary_key = 'id';

    public function check_register_chanel($chanel) {
        $this->db->where(array('account_id' => $this->auth->userid(), 'chanel_id' => $chanel));
        $result = $this->get();
        if (count($result)) {
            return TRUE;
        }
        return FALSE;
    }
    
    
}
?>
