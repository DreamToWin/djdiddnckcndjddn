<?php

class Playlist_Model extends MY_Model {

    protected $_table_name = 'playlist';
    protected $_order_by = 'id';
    protected $_primary_key = 'id';

    function check_title_playlist($title) {
        $this->db->where(array('title' => $title, 'account_id' => $this->auth->userid()));
        $result = $this->get();
        if (count($result)) {
            return TRUE;
        }
        return FALSE;
    }

    function get_playlist($account_id) {
        $this->_table_name = '';
        $this->db->select('playlist.id as id, title, nickname');
        $this->db->from('playlist');
        $this->db->join('account', 'account.id = playlist.account_id');
        $this->db->where(array('playlist.account_id' => $account_id));
        $query = $this->db->get();
        if (count($query) > 0) {
            return $query->result();
        } return FALSE;
    }

    function get_video_subcription($playlist_id) {
        $this->_table_name = '';
        $this->db->select('v.id, v.title, v.slug, v.post_date, v.video_id');
        $this->db->from('video as v');
        $this->db->join('video_playlist', 'v.id= video_playlist.video_id');
        $this->db->where(array('playlist_id' => $playlist_id));
        $query = $this->db->get();
        if (count($query) > 0) {
            return $query->result();
        } return FALSE;
    }

}
