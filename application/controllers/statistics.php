<?php

class Statistics extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('statistics_view_model');
        $this->load->helper('123xem');
    }

    function updateView() {
        $data = $this->getView();
        if (count($data)) {
            $result = $this->statistics_view_model->insert_batch($data['insert']);
            if ($result > 0) {
                $this->memcachedlib->delete($data['delete']);
            }
        }
    }

    function getView() {
        $keys = $this->memcachedlib->getAll();
        $data = array();
        foreach ($keys as $value) {
            $tmp = explode(':', $value);
            if (isset($tmp[0]) && $tmp[0] == 'video' && isset($tmp[1]) && is_numeric($tmp[1])) {
                $delete[] = $value;
                $insert[] = array(
                    'video_id' => $tmp[1],
                    'views' => $this->memcachedlib->get($value),
                    'statistics_date' => getNowTimestamp()
                );
            } else {
                continue;
            }
        }
        if (isset($insert) && isset($delete)) {
            $data = array('delete' => $delete, 'insert' => $insert);
        }
        return $data;
    }

}
