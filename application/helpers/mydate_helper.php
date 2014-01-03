<?php

function mysqldatetime_to_timestamp($datetime = "") {
    // function is only applicable for valid MySQL DATETIME (19 characters) and DATE (10 characters)
    $l = strlen($datetime);
    if (!($l == 10 || $l == 19))
        return 0;
    $date = $datetime;
    $hours = 0;
    $minutes = 0;
    $seconds = 0;
    // DATETIME only
    if ($l == 19) {
        list($date, $time) = explode(" ", $datetime);
        list($hours, $minutes, $seconds) = explode(":", $time);
    }
    list($year, $month, $day) = explode("-", $date);
    return mktime($hours, $minutes, $seconds, $month, $day, $year);
}

function mysqldatetime_to_date($datetime = "", $format = "Y/m/d H:i:s") {
    return date($format, mysqldatetime_to_timestamp($datetime));
}

function timestamp_to_mysqldatetime($timestamp = "", $datetime = true) {
    if (empty($timestamp) || !is_numeric($timestamp))
        $timestamp = time();
    return ($datetime) ? date("Y-m-d H:i:s", $timestamp) : date("Y-m-d", $timestamp);
}

function timestamp_to_date($timestamp = "", $format = "Y/m/d H:i:s") {
    if (empty($timestamp) || !is_numeric($timestamp))
        $timestamp = time();
    return date($format, $timestamp);
}

function date_to_timestamp($datetime = "") {
    if (!preg_match("/^(\d{2}(\d{2})?)[.\- \/N](\d{1,2})[.\- \/](\d{1,2})ú?( (\d{1,2})(|[:](\d{1,2})(|ª|([:ª](\d{1,2})b?)?)))?$/iu", $datetime, $date)) {
        return FALSE;
    }

    $year = $date[1];
    $month = $date[3];
    $day = $date[4];
    $hour = (empty($date[6])) ? 0 : $date[6];
    $min = (empty($date[8])) ? 0 : $date[8];
    $sec = (empty($date[11])) ? 0 : $date[11];
    return mktime($hour, $min, $sec, $month, $day, $year);
}

function date_to_mysqldatetime($date = "", $datetime = TRUE) {
    return timestamp_to_mysqldatetime(date_to_timestamp($date), $datetime);
}

function get_age($birth) {
    if ($birth) {
        $ty = date("Y");
        $tm = date("m");
        $td = date("d");
        list($by, $bm, $bd) = explode('-', mysqldatetime_to_date($birth, "Y-m-d"));
        $age = $ty - $by;
        if ($tm * 100 + $td < $bm * 100 + $bd)
            $age--;
        return $age;
    } else {
        return "H";
    }
}