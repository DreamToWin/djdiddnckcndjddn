<?php

class Search_Model extends MY_Model {

    function search_video($keyword, $limit, $start) {
        $sql = "SELECT title, description, sum(views) as total_view, video.video_id, slug, post_date
                    FROM video JOIN statistics_view on video.id = statistics_view.video_id
                    WHERE MATCH (title, description) AGAINST (". $this->db->escape($keyword) . ") GROUP BY video.id";
        $this->db->limit($limit, $start);
        $query = $this->db->query($sql);
        return $query->result();
    }

    function count_search_video($keyword) {
        $sql = "SELECT title
                    FROM video JOIN statistics_view on video.id = statistics_view.video_id
                    WHERE MATCH (title, description) AGAINST (". $this->db->escape($keyword) . ") GROUP BY video.id";
        $query = $this->db->query($sql);
        return $query->num_rows;
    }

}
