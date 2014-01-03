<?php

class Statistics_View_Model extends MY_Model {
    protected $_table_name = 'statistics_view';
    protected $_order_by = 'id';
    protected $_primary_key = 'id';
    
    public function list_hot($limit = 12, $start = 0){
        $sql = "SELECT SUM( `views` ) AS `total_view` , `video`.`id`, `video`.`video_id` , `title` , `slug` , `post_date` FROM statistics_view JOIN video ON";
        $sql .= " statistics_view.video_id = video.id WHERE `status` = 1 GROUP BY statistics_view.video_id ORDER BY total_view DESC limit {$start},{$limit}";
        return $this->db->query($sql)->result();
    }
    
     public function list_new($limit = 12, $start = 0){
        $sql = "SELECT SUM( `views` ) AS `total_view` , `video`.`id`, `video`.`video_id` , `title` , `slug` , `post_date` FROM statistics_view JOIN video ON";
        $sql .= " statistics_view.video_id = video.id WHERE `status` = 1 GROUP BY statistics_view.video_id ORDER BY post_date DESC, total_view ASC limit {$start},{$limit}";
        return $this->db->query($sql)->result();
    }
    
    public function count_new(){
        $sql = "SELECT count(*) as total FROM video";
        return $this->db->query($sql)->row();
    }
    
    
    
    
//    public function list_new($limit = 12, $start = 0){
//        $sql = "SELECT SUM( `views` ) AS `total_view` , `video`.`id`, `video`.`video_id` , `title` , `slug` , `post_date` FROM statistics_view JOIN video ON";
//        $sql .= " statistics_view.video_id = video.id WHERE `status` = 1 GROUP BY statistics_view.video_id ORDER BY post_date DESC, total_view ASC limit {$start},{$limit}";
//        return $this->db->query($sql)->result();
//    }
}