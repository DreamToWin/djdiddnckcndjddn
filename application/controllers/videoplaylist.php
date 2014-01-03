<?php

class Videoplaylist extends Frontend_Controller {

    function __construct() {
        parent::__construct();
    }

    function add() {
        if ($this->input->post('video_id')) {
            $video_id = $this->input->post('video_id');
            $playlist_id = $this->input->post('playlist_id');
            $this->load->model('video_playlist_model');
            $data = array(
                'video_id' => $video_id,
                'playlist_id' => $playlist_id
            );
            if ($this->video_playlist_model->check_video_playlist($video_id, $playlist_id)) {
                echo 'exists';
            } elseif ($this->video_playlist_model->save($data) > 0) {
                echo 'success';
            } else {
                echo 'failure';
            }
        }
    }

}
