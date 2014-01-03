<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Backend_Controller extends MY_Controller {

    public function __construct() {
        parent::__construct();

        //Load library
        $this->load->library('form_validation');
        $this->load->library('session');
        $this->load->library('recursive');
        $this->load->library('breadcrumbcomponent');
        $this->load->library('mail');
        $this->load->model('account_model');

        //Load helper
        $this->load->helper('form');
        $this->load->helper('123xem');
        $this->load->helper('mydate');

        // Hiển thị breadcrumb
        $url = base_url('nevergiveup/' . $this->uri->segment(2));
        $this->breadcrumbcomponent->add('Trang chủ', base_url('nevergiveup'));
        $this->breadcrumbcomponent->add($this->uri->segment(2), $url);
        $this->breadcrumbcomponent->add($this->uri->segment(3), $url);
        $this->data['breadcrum'] = $this->breadcrumbcomponent->output();

        //Set default layour
        $this->template->set_layout('backend');

        //Custom format error
        $this->form_validation->set_error_delimiters('<span class="help-block error">', '</span>');

        //Login check
        $exception_uris = array(
            'nevergiveup/account/login',
            'nevergiveup/account/logout'
        );

        if (in_array(uri_string(), $exception_uris) == FALSE) {
            if ($this->account_model->loggedin() == FALSE) {
                redirect('nevergiveup/account/login');
            }
        }
    }

}

?>
