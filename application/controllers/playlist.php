<?php

class Playlist extends Frontend_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('playlist_model');
    }

    function ajax_add_playlist() {
        if ($this->input->post('title')) {
            $name = $this->input->post('title');
            if ($this->playlist_model->check_title_playlist($name)) {
                echo 'exists';
            } else {
                $data = $this->array_from_post(array('title', 'type'));
                $data['create_date'] = getNowTimestamp();
                $data['account_id'] = $this->auth->userid();
                $id = $this->playlist_model->save($data);
                if ($id > 0) {
                    echo $id;
                } else {
                    echo 'failure';
                }
            }
        }
    }

    function index() {
        if (loggedin()) {
            $account_id = $this->auth->userid();
            $data = $this->playlist_model->get_playlist($account_id);
            $title = 'Danh sách phát ' . $this->session->userdata('nickname');
            $this->data['playlists'] = $data;
            $this->data['title'] = $title . '-' . ' Bạn đang xem video tại 123xem.vn';
            $this->template->build('frontend/playlist/playlist', $this->data);
        }
    }

    function ajax_load_video_subcription() {
        $data = $this->array_from_post(array('playlist_id'));
        print_r($data['playlist_id']);
        $result['vsubcriptions'] = $this->playlist_model->get_video_subcription($data['playlist_id']);
        $this->load->view('frontend/playlist/ajax_load_video_subcription', $result);
    }

}