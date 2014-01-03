<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class BreadcrumbComponent {

    private $breadcrumbs = array();
    private $start = '<ul>';
    private $end = '</ul>';

    public function __construct($params = array()) {
        if (count($params) > 0) {
            $this->initialize($params);
        }
    }

    private function initialize($params = array()) {
        if (count($params) > 0) {
            foreach ($params as $key => $val) {
                if (isset($this->{'_' . $key})) {
                    $this->{'_' . $key} = $val;
                }
            }
        }
    }

    function add($title, $href) {
        if (!$title OR !$href)
            return;
        $this->breadcrumbs[] = array('title' => $title, 'href' => $href);
    }

    function output() {
        if ($this->breadcrumbs) {
            $output = $this->start;
            foreach ($this->breadcrumbs as $key => $crumb) {
                if (end(array_keys($this->breadcrumbs)) == $key) {
                    $output .= '<li><a title="' . $crumb['title'] . '">' . $crumb['title'] . '</a></li>';
                } else {
                    $output .= '<li><a href="' . $crumb['href'] . '" title="' . $crumb['title'] . '">' . $crumb['title'] . '</a><i class="icon-angle-right"></i></li>';
                }
            } return $output . $this->end . PHP_EOL;
        } return '';
    }

}