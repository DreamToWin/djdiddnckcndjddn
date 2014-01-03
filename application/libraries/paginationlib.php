<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Paginationlib {

//put your code here
    function __construct() {
        $this->ci = & get_instance();
        $this->ci->config->load('pagination');
        $this->ci->load->library('pagination');
    }

    public function initPagination($base_url, $total_rows, $perpage = 1, $uri_segment = 3) {
        $config['per_page'] = $perpage;
        $config['uri_segment'] = $uri_segment;
        $config['base_url'] = base_url() . $base_url;
        $config['total_rows'] = $total_rows;
        $config['use_page_numbers'] = TRUE;
        $this->ci->pagination->initialize($config);
        return $config;
    }
}