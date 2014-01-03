<?php
class Video_Playlist_Model extends MY_Model {

    protected $_table_name = 'video_playlist';
    protected $_order_by = 'id';
    protected $_primary_key = 'id';

    function check_video_playlist($video_id, $playlist_id) {
        $this->db->where(array('video_id' => $video_id, 'playlist_id' => $playlist_id));
        $result = $this->get();
        if (count($result)) {
            return TRUE;
        } return FALSE;
    }
}
