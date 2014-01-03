<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of index
 *
 * @author phucp_000
 */
class Index extends Backend_Controller {

    function __construct() {
        parent::__construct();
        $this->data['page'] = "Quản trị";
    }

    function index() {
        $this->data['title'] = "Quản trị hệ thống";
        $this->template->build('backend/index/index', $this->data);
    }

}

?>
