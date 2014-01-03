<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
date_default_timezone_set('Asia/Ho_Chi_Minh');

//Button action
function btn_edit($uri) {
    return anchor($uri, '<i class="icon-edit"></i> Sửa ', 'name="Sửa"');
}

function btn_delete($uri) {
    return anchor($uri, '<i class="icon-remove"></i> Xóa ', array('class' => 'checkDelete', 'name' => 'Xóa', 'data-bb' => 'confirm'));
}

function btn_recover($uri) {
    return anchor($uri, '<i class="icon-refresh"></i> Khôi phục ', 'Khôi phục');
}

function btn_detail($uri) {
    return anchor($uri, '<i class="icon-th-list"></i> Chi tiết ', 'name="Xem chi tiết"');
}

// Button Frontend
function btn_frontend_edit($uri) {
    return anchor($uri, '<i class="icon-edit"></i> Sửa ', 'name="Sửa"');
}

function btn_frontend_delete($uri) {
    return anchor($uri, '<i class="icon-remove"></i> Xóa ', array('class' => 'checkDelete', 'name' => 'Xóa', 'data-bb' => 'confirm'));
}

// Highlight menu
function activeTopMenu($uri) {
    $CI = & get_instance();
    $current = $CI->uri->segment(2);
    if (is_array($uri) && in_array($current, $uri)) {
        echo 'class="active"';
    } elseif ($uri == $current) {
        echo 'class="active"';
    }
}

function loggedin() {
    $CI = & get_instance();
    $tmp = false;
    if ($CI->auth->loggedin() === TRUE) {
        $tmp = true;
    }
    return $tmp;
}

function convertViToEn($str) {
    $strReplate = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
    $strReplate = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $strReplate);
    $strReplate = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $strReplate);
    $strReplate = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $strReplate);
    $strReplate = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $strReplate);
    $strReplate = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $strReplate);
    $strReplate = preg_replace("/(đ)/", 'd', $strReplate);
    $strReplate = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $strReplate);
    $strReplate = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $strReplate);
    $strReplate = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $strReplate);
    $strReplate = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $strReplate);
    $strReplate = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $strReplate);
    $strReplate = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $strReplate);
    $strReplate = preg_replace("/(Đ)/", 'D', $strReplate);
    $strReplate = strtolower($strReplate);
    return $strReplate;
}

function toSlug($str, $type = '') {
    $strReplate = strtolower(preg_replace(array('/[^a-zA-Z0-9 -]/', '/[ -]+/', '/^-|-$/'), array('', '-', ''), convertViToEn($str)));
    $strReplate = $strReplate . $type;
    return $strReplate;
}

//function status_account
function status_account($status) {
    $text = '';
    if ($status == 1) {
        $text = "Kích hoạt";
    } else {
        $text = "Không kích hoạt";
    }
    return $text;
}

function status_permission($type) {
    $text = '';
    if ($type == 1) {
        $text = "Công khai";
    } elseif ($type == 2) {
        $text = "Không công khai";
    } else {
        $text = "Riêng tư";
    }
    return $text;
}

function status_menu($status) {
    $text = '';
    if ($status == 1) {
        $text = "Hiển thị";
    } else {
        $text = "Ẩn";
    }
    return $text;
}

function sex($sex) {
    $gender = '';
    if ($sex == 1) {
        $gender = "Nam";
    } else {
        $gender = "Nữ";
    }
    return $gender;
}

function get_position($str) {
    $position = '';
    switch ($str) {
        case 1:
            $position = 'Top';
            break;
        case 2:
            $position = 'Header';
            break;
        case 3:
            $position = 'Sidebar';
            break;
        case 4:
            $position = 'Bottom';
            break;
        case 5:
            $position = 'Trượt phải';
            break;
        case 6:
            $position = 'Trượt trái';
            break;
        default:
            $position = 'No position';
            break;
    }
    return $position;
}

function contact_status($str) {
    $status = '';
    switch ($str) {
        case 1:
            $status = 'Thư mới';
            break;
        case 2:
            $status = 'Đã đọc - Chưa xử lý';
            break;
        case 3:
            $status = 'Đã trả lời';
            break;
        case 4:
            $status = 'Thùng rác';
            break;
        default:
            $status = 'Tất cả thư';
            break;
    }
    return $status;
}

function video_status($str) {
    $status = '';
    switch ($str) {
        case 2:
            $status = 'Báo vi phạm';
            break;
        case 3:
            $status = 'Thùng rác';
            break;
        case 4:
            $status = 'Đã xóa';
            break;
        default:
            $status = 'Đang chạy';
            break;
    }
    return $status;
}

// Captcha using session
function captcha() {
    $CI = & get_instance();
    $CI->load->library('session');
    $CI->config->load('question');
    $questions = $CI->config->item('question');
    $key = array_rand($questions);
    $item = $questions[$key];
    $CI->session->set_userdata('question', $item['question']);
    $CI->session->set_userdata('answer', $item['answer']);
}

function checkAnswerCatpcha($answer) {
    $CI = & get_instance();
    $tmp = false;
    if ($CI->session->userdata('answer') === $answer) {
        $tmp = true;
    }
    return $tmp;
}

// Alert messsage
function alertMessage($title, $notice, $type = 'danger') {
    $message = '<div class="alert alert-' . $type . ' fade in">';
    $message .= '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>';
    $message .= '<strong>' . $title . '!</strong> ' . $notice . '</div>';
    return $message;
}

//Date Time
// Get current date or datetime now.(Custom format)
function getNowTimestamp($format = 'm/d/Y H:i:s') {
    $now = date("Y-m-d H:i:s");
    $timestamp = strtotime($now);
    return $timestamp;
}

function getTimestamp($value) {
    $timestamp = strtotime($value);
    return $timestamp;
}

// Convert timestamp to datetime
function convertToDatetime($value, $format = 'm/d/Y H:i:s') {
    $result = date($format, $value);
    return $result;
}

// Convert timestamp to date
function getConvetDate($value, $format = 'd/m/Y') {
    return convertToDatetime($value, $format);
}

// Convert timestamp to datetime
function getConvertDatetime($value, $format = 'd/m/Y H:i:s') {
    return convertToDatetime($value, $format);
}

// Time_ago
function timeago($date) {
    $date_ago = getConvertDatetime($date, 'm/d/Y H:i:s');
    if (empty($date_ago)) {
        return "No date provided";
    }
    $periods = array("giây", "phút", "giờ", "ngày", "tuần", "tháng", "năm", "thập kỷ");
    $lengths = array("60", "60", "24", "7", "4.35", "12", "10");
    $now = time();
    $unix_date = strtotime($date_ago);
    // check validity of date
    if (empty($unix_date)) {
        return "Bad date";
    }

    // is it future date or past date
    if ($now > $unix_date) {
        $difference = $now - $unix_date;
        $tense = "trước";
    } else {
        $difference = $unix_date - $now;
        $tense = "from now";
    }
    for ($j = 0; $difference >= $lengths[$j] && $j < count($lengths) - 1; $j++) {
        $difference /= $lengths[$j];
    }
    $difference = round($difference);
    return "$difference $periods[$j] {$tense}";
}

//Random view
function random_view() {
    return rand(500, 5000);
}

/*
 * Truyền vào 1 mảng. $list
 * @return contruct list menu
 */

function get_ol(&$list, $child = FALSE) {
    $str = '';
    if (count($list)) {
        $str .= $child == FALSE ? '<ol class="sortable">' : '<ol>';
        foreach ($list as $item) {
            $str .= '<li id="list_' . $item->id . '">';
            $str .= '<div>' . $item->name . '</div>';
            if (isset($item->children) && count($item->children)) {
                $str .= get_ol($item->children, TRUE);
            }
            $str .= '</li>' . PHP_EOL;
        }
        $str .= '</ol>' . PHP_EOL;
    }
    return $str;
}

function get_ul(&$list, $child = FALSE) {
    $str = '';
    if (count($list)) {
        $str .= $child == FALSE ? '<ul>' : '<ul>';
        foreach ($list as $item) {
            $str .= '<li>';
            $str .= '<a href="' . site_url('category/' . $item->slug) . '" title="' . $item->name . '">' . $item->name . '</a>';
            if (isset($item->children) && count($item->children)) {
                $str .= get_ul($item->children, TRUE);
            }
            $str .= '</li>' . PHP_EOL;
        }
        $str .= '</ul>' . PHP_EOL;
    }
    return $str;
}

function random_key($length = 6) {
    $textHash = md5(uniqid());
    return substr($textHash, 0, $length);
}

function get_video_id($url) {
    parse_str(parse_url($url, PHP_URL_QUERY), $my_array_of_vars);
    $video_id = '';
    if (isset($my_array_of_vars['v'])) {
        $video_id = $my_array_of_vars['v'];
    }
    return $video_id;
}

//Front end

function check_register_chanel($chanel) {
    $CI = & get_instance();
    $CI->load->model('chanel_model');
    return $CI->chanel_model->check_register_chanel($chanel);
}

function check_user_chanel($chanel) {
    $CI = & get_instance();
    if ($CI->auth->userid() == $chanel) {
        return TRUE;
    } else {
        return FALSE;
    }
}

function the_content($text) {
    $sanitized = htmlentities($text, ENT_COMPAT, 'UTF-8');
    return str_replace(array("\r\n", "\n"), array("<p>", "</p>"), $sanitized);
}

function the_excerpt($text, $string = 400) {
    $sanitized = htmlspecialchars($text, ENT_QUOTES, "UTF-8");
    if (strlen($sanitized) > $string) {
        $cutString = substr($sanitized, 0, $string);
        $words = substr($sanitized, 0, strrpos($cutString, ' '));
        return $words;
    } else {
        return $sanitized;
    }
}

function the_description($text, $string = 160) {
    return the_excerpt($text, $string);
}