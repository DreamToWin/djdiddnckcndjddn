<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Frontend_Controller extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->template->set_layout('frontend');
        $this->data['sidebar'] = '';
        $this->load->library(array('form_validation', 'session'));
        $this->load->helper('123xem');
        $this->form_validation->set_error_delimiters('<span class="error-field">', '</span>');
        $this->config->load('config_facebook');
        $this->data['app_id'] = $this->config->item('appID');
    }

}