<?php

class Chanel extends Frontend_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('chanel_model');
    }

    function ajax_register_chanel() {
        if (loggedin()) {
            $chanel_id = $this->input->post('chanel');
            $account_id = $this->auth->userid();
            if (!$this->chanel_model->check_register_chanel($chanel_id)) {
                $data = array(
                    'chanel_id' => $chanel_id,
                    'account_id' => $account_id
                );
                if ($this->chanel_model->save($data) > 0) {
                    echo 'success';
                } else {
                    echo 'failure';
                }
            } else {
                echo 'registed';
            }
        }
    }

    function ajax_unregister_chanel() {
        if (loggedin()) {
            $chanel_id = $this->input->post('chanel');
            $account_id = $this->auth->userid();
            if ($this->chanel_model->check_register_chanel($chanel_id)) {
                $data = array(
                    'chanel_id' => $chanel_id,
                    'account_id' => $account_id
                );
                $this->chanel_model->delete_by($data);
                echo 'success';
            }
        }
    }
}

?>
