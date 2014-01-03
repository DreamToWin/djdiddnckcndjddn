<?php

class Video_Model extends MY_Model {

    protected $_table_name = 'video';
    protected $_order_by = 'id';
    protected $_primary_key = 'id';
    public $rules = array(
        'title' => array(
            'field' => 'title',
            'label' => 'Tiêu đề',
            'rules' => 'trim|required|min_length[6]|max_length[255]'
        ),
        'link' => array(
            'field' => 'link',
            'label' => 'Link',
            'rules' => 'trim|required|url|min_length[20]|max_length[255]|callback__unique_link'
        ),
        'category' => array(
            'field' => 'category_id',
            'label' => 'Chuyên mục',
            'rules' => 'trim|required'
        ),
        'description' => array(
            'field' => 'description',
            'label' => 'Giới thiệu',
            'rules' => 'trim|required|min_length[10]|max_length[500]'
        )
    );

    public function get_new() {
        $video = new stdClass();
        $video->id = '';
        $video->title = '';
        $video->link = '';
        $video->category_id = '0';
        $video->post_date = '';
        $video->link_die = '0';
        $video->violation = '0';
        $video->hotbrain = '0';
        $video->account_id = '';
        $video->description = '';
        $video->status = '0';
        $video->total_view = '0';
        return $video;
    }

    //frontend
    function count_video_upload($account_id) {
        $result = $this->get_by(array('account_id' => $account_id, 'status !=' => '4'), FALSE, TRUE);
        return count($result);
    }

    function get_video_upload($account_id, $limit, $start) {
        $this->db->select('id, title, slug');
        $this->db->limit($limit, $start);
        $this->db->order_by("id", "desc"); 
        return parent::get_by(array('account_id' => $account_id, 'status !=' => ' 4'));
    }

    function count_video_chanel($id) {
        $result = $this->get_by(array('account_id' => $id, 'status !=' => '4'), FALSE, TRUE);
        return count($result);
    }

    function get_video_chanel($account_id, $limit, $start) {
        $sql = "SELECT SUM( `views` ) AS `total_view`,v.title, v.slug, v.video_id, v.post_date FROM statistics_view ";
        $sql .= "JOIN video as v ON statistics_view.video_id = v.id ";
        $sql .= "JOIN account as a ON v.account_id = a.id ";
        $sql .= "  WHERE v.account_id = {$account_id} AND v.status = 1 GROUP BY v.id ORDER BY v.id DESC LIMIT $start,$limit";
        $query = $this->db->query($sql);
        return $query->result();
        
        
        
//        $this->db->select('id, title, slug, post_date, video_id');
//        $this->db->limit($limit, $start);
//        return parent::get_by(array('account_id' => $account_id, 'status !=' => ' 4'), FALSE, $type);
    }

    function get_video_play($slug) {
        $sql = "SELECT SUM( `views` ) AS `total_view`,v.id, v.title,v.slug, v.video_id, v.description, v.post_date, v.status, c.name,a.username, a.nickname, c.id as idcat, a.avatar, a.id as userid FROM statistics_view ";
        $sql .= "JOIN video as v ON statistics_view.video_id = v.id ";
        $sql .= "JOIN account as a ON v.account_id = a.id ";
        $sql .= "JOIN category as c ON v.category_id = c.id ";
        $sql .= "  WHERE v.slug = '{$slug}' GROUP BY v.id LIMIT 1";
        $query = $this->db->query($sql);
        return $query->row();
    }

    function get_video_related($id, $video_id) {
        $sql = "SELECT SUM( `views` ) AS `total_view`,v.title, v.slug, v.video_id, v.post_date, a.nickname FROM statistics_view ";
        $sql .= "JOIN video as v ON statistics_view.video_id = v.id ";
        $sql .= "JOIN account as a ON v.account_id = a.id ";
        $sql .= "  WHERE v.category_id = {$id} AND v.status = 1 AND v.id != $video_id GROUP BY v.id ORDER BY total_view DESC LIMIT 6";
        $query = $this->db->query($sql);
        return $query->result();
    }

 

    function get_subcription($id) {
        $this->_table_name = '';
        $this->db->select('username, avatar, account.id AS id');
        $this->db->from('subscribe_chanel');
        $this->db->join('account', 'account.id = subscribe_chanel.chanel_id');
        $this->db->where(array('account_id' => $id));
        $query = $this->db->get();
        return $query->result();
    }
}