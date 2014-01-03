<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Recursive {

    private $html = '';

    function dropdown($data, $selected = 0, $parent = 0, $text = ' ') {
        $dropdow = '';
        foreach ($data as $key => $value) {
            if ($value->parent_id == $parent) {
                $id = $value->id;
                $name = $value->name;
                $dropdow = ($id == $selected) ? "selected='selected'" : '';
                $this->html .= "<option value='$id' $dropdow>$text $name</option>";
                $this->dropdown($data, $selected, $id, $text . "--");
            }
        }
        return $this->html;
    }

    function position() {
        $position = array(
            '0' => 'No',
            '1' => 'Top',
            '2' => 'Header',
            '3' => 'Sidebar',
            '4' => 'Bottom',
            '5' => 'Trượt phải',
            '6' => 'Trượt trái'
        );
        return $position;
    }

    /*
     * get_nested to sort
     */

    function get_nested($data) {
        $nodes = array();
        $tree = array();
        foreach ($data as &$node) {
            $node->children = array();
            $id = $node->id;
            $parent_id = $node->parent_id;
            $nodes[$id] = & $node;
            if (array_key_exists($parent_id, $nodes)) {
                $nodes[$parent_id]->children[] = & $node;
            } else {
                $tree[] = & $node;
            }
        }
        return $tree;
    }
}
?>
