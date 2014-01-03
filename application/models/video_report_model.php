<?php

class Video_Report_Model extends MY_Model {
    protected $_table_name = 'video_report';
    protected $_order_by = 'id';
    protected $_primary_key = 'id';
    
    function check_account_report($video_id, $type){
        $this->db->where(array('video_id' => $video_id, 'type' => $type, 'account_id' => $this->auth->userid()));
        $result = $this->get();
        if(count($result)){
            return TRUE;
        }
        return FALSE;
    }
}

?>
