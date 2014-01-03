<?php

echo get_ol($test);

//
////print_r($test);
//
//
//    function get_ol($array, $child = FALSE) {
//        $str = '';
//        if (count($array)) {
//            $str .= $child == FALSE ? '<ol class="sortable">' : '<ol>';
//            foreach ($array as $item) {
//                $str .= '<li id="list_' . $item['id'] . '">';
//                $str .= '<div>' . $item['name'] . '</div>';
//                // Do we have any children?
//                if (isset($item['children']) && count($item['children'])) {
//                    $str .= get_ol($item['children'], TRUE);
//                    if (count($item['children'])) {
//                        
//                    }
//                }
//                $str .= '</li>' . PHP_EOL;
//            }
//            $str .= '</ol>' . PHP_EOL;
//        }
//
//        return $str;
//    }

function get_ol(&$list, $child = FALSE) {
    $str = '';
    if (count($list)) {
        $str .= $child == FALSE ? '<ol class="sortable">' : '<ol>';
        foreach ($list as $item) {
            $str .= '<li id="list_' . $item->id . '">';
            $str .= '<div>' . $item->name . '</div>';
            echo $item->id;
            if (isset($item->children) && count($item->children)) {
                $str .= get_ol($item->children, TRUE);
            }
            $str .= '</li>' . PHP_EOL;
        }
        $str .= '</ol>' . PHP_EOL;
    }
    return $str;
}
?>