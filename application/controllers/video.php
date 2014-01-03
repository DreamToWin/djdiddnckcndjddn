<?php

class Video extends Frontend_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('video_model');
        $this->load->library('memcachedlib');
    }

    function watch($slug = null) {
        $this->data['sidebar'] = 'related';
        if ($slug != null) {
            $data = $this->video_model->get_video_play($slug);
            count($data) || redirect('errors/404.html');
            $this->data['video'] = $data;
            $this->data['title'] = $data->title;
            $this->data['description'] = $data->description != '' ? $data->description . ' - ' : $data->title;
            $this->data['related'] = $this->video_model->get_video_related($data->idcat, $data->id);
            
            $key = 'video:' . $data->id;
            if ($this->memcachedlib->get($key) > 0) {
                $this->memcachedlib->increment($key);
            } else {
                $this->memcachedlib->add($key, 1);
            }
        } else {
            redirect('');
        }
        $this->load->model('playlist_model');
        $this->config->load('report_video');
        $this->config->load('playlist');
        $this->data['reports'] = $this->config->item('report_video');
        $this->data['video_permission'] = $this->config->item('video_permission');
        $this->data['description'] = the_description($data->title . ' - ' . 'Bạn đang xem video tại 123xem.vn');
        $this->data['image'] = "http://img.youtube.com/vi/{$data->video_id}/hqdefault.jpg";
        $this->data['playlists'] = $this->playlist_model->get_by(array('account_id' => $this->auth->userid()));
        $this->template->build('frontend/video/watch', $this->data);
    }

    function upload($id = null) {
        $this->data['sidebar'] = 'upload';
        if (!$this->auth->loggedin()) {
            redirect('account');
        }
        $this->data['title'] = 'Đăng video';
        if ($id) {
            $data = $this->video_model->get_by(array('status' => 1, 'id' => $id, 'account_id' => $this->auth->userid()), TRUE);
            $this->data['video'] = $data;
            count($this->data['video']) || redirect('errors/404.html');
            $selected = $data->category_id;
            $this->data['title'] = 'Chỉnh sửa video';
        } else {
            $selected = 0;
            $this->data['video'] = $this->video_model->get_new();
        }
        // Hiển thị chuyên mục
        $this->load->model('category_model');
        $this->load->library('recursive');
        if ($this->input->post('parent_id')) {
            $selected = $this->input->post('parent_id');
        }
        $categories = $this->category_model->get_by(array('status' => 1));
        $select = $this->recursive->dropdown($categories, $selected);
        $this->data['select'] = $select;


        // Kiểm tra dữ liệu
        $rules = $this->video_model->rules;
        $this->form_validation->set_rules($rules);
        if ($this->form_validation->run() == TRUE) {
            $data = $this->array_from_post(array('title', 'link', 'category_id', 'description'));
            $data['video_id'] = get_video_id($data['link']);
            $message = "Bạn sửa video thành công!";
            if ($id == null) {
                $data['slug'] = $this->createSlug($data['title']);
                $data['post_date'] = getNowTimestamp();
                $data['account_id'] = $this->auth->userid();
                $data['status'] = 1;
                $message = "Bạn đã thêm video mới thành công!";
            }
            $result = $this->video_model->save($data, $id);
            if ($result > 0) {
                $this->session->set_flashdata('message', alertMessage('Thành công', $message, 'success'));
                $views = array(
                    'video_id' => $result,
                    'statistics_date' => getNowTimestamp()
                );
                $this->load->model('statistics_view_model');
                $this->statistics_view_model->save($views);
                redirect('video/upload');
            } else {
                $this->data['message'] = alertMessage('Có lỗi', 'Có lỗi xảy ra. Bạn vui lòng thử lại!');
            }
        }
        $this->data['description'] = 'Hãy đăng những video mà bạn yêu thích nhất. Cùng chia sẻ, cùng vui, cùng kiếm tiền từ 123xem.vn';
        $this->template->build('frontend/video/upload', $this->data);
    }

    function uploaded($page = 1) {
        $this->data['sidebar'] = 'upload';
        $this->data['title'] = 'Danh sách video bạn đã đăng lên';
        if (!$this->auth->loggedin()) {
            redirect('account');
        }
        $id = $this->auth->userid();
        $this->load->library('paginationlib');
        $count = $this->video_model->count_video_upload($id);
        $pagingConfig = $this->paginationlib->initPagination('video/uploaded' . '/', $count, 10);
        $data = $this->video_model->get_video_upload($id, $pagingConfig['per_page'], (($page - 1) * $pagingConfig['per_page']));
        $this->data['videos'] = $data;
        $this->data['pagination'] = $this->pagination->create_links();
        $this->data['description'] = 'Các chiến lợi phẩm mà bạn đã có. Nhanh tay tìm thêm những chiến lợi phẩm khác nhé!';
        $this->template->build('frontend/video/list_upload', $this->data);
    }

    function delete($id) {
        if (!$this->auth->loggedin()) {
            redirect('account');
        }
        $data['status'] = 4;
        $this->video_model->save($data, $id);
        redirect('video/uploaded');
    }

    public function createSlug($title) {
        $slug = toSlug($title);
        $this->db->select('slug');
        $this->db->where('slug', $slug);
        $video = $this->video_model->get();
        if (count($video)) {
            $slug = $slug . '-' . random_key(4);
        }
        return $slug;
    }

    function chanel($username) {
        $per_page = 12;
        $this->load->model('account_model');
        $id = $this->account_model->get_id($username);

        if ($id == false) {
            redirect('errors/404.html');
            exit();
        }
        $total = $this->video_model->count_video_chanel($id);
        $data = $this->video_model->get_video_chanel($id, $per_page, 0);
        $title = "Kênh của " . $username;
        $this->data['total'] = $total;
        $this->data['per_page'] = $per_page;
        $this->data['account_id'] = $id;
        $this->data['videos'] = $data;
        $this->data['title'] = $title;
        $this->data['description'] = $title . ' - ' . $this->config->item('site_description');
        $this->template->build('frontend/video/chanel', $this->data);
    }

    function ajax_load_subscription() {
        $data = $this->array_from_post(array('account_id'));
        $result['subcriptions'] = $this->video_model->get_subcription($data['account_id']);
        $this->load->view('frontend/video/ajax_load_subscription', $result);
    }

    function ajax_load_more() {
        $data = $this->array_from_post(array('page', 'per_page', 'account_id'));
        $result['videos'] = $this->video_model->get_video_chanel($data['account_id'], $data['per_page'], ($data['page'] - 1) * $data['per_page']);
        $this->load->view('frontend/video/ajax_load_more', $result);
    }

    function ajax_load_video_playlist() {
        $this->load->view('frontend/video/ajax_load_video_playlist', "Test");
    }

    public function _unique_link() {
        $id = $this->uri->segment(2);
        if ($id != null) {
            $this->db->where('id != ', $id);
        }
        $this->db->where('link', $this->input->post('link'));
        $account = $this->video_model->get();
        if (count($account)) {
            $this->form_validation->set_message('_unique_link', '%s này đã tồn tại');
            return FALSE;
        }
        return TRUE;
    }

    function report() {
        if ($this->input->post('video_id')) {
            $data = $this->array_from_post(array('video_id', 'type'));
            $data['account_id'] = $this->auth->userid();
            $this->load->model('video_report_model');
            if ($this->video_report_model->check_account_report($data['video_id'], $data['type'])) {
                echo 'reported';
            } elseif ($this->video_report_model->save($data) > 0) {
                echo 'success';
            } else {
                echo 'failure';
            }
        }
    }

    function news($page = 2) {
        if ($page != null) {
            $this->data['sidebar'] = "cate";
            $this->load->library('paginationlib');
            $this->load->model('statistics_view_model');
            $number = $this->statistics_view_model->count_new();
            $count = $number->total;

            $pagingConfig = $this->paginationlib->initPagination('videonew/', $count, 16, 2);
            $data = $this->statistics_view_model->list_new($pagingConfig['per_page'], (($page - 1) * $pagingConfig['per_page']));
            
            
            $this->data['news'] = $data;
            if (count($data) > 0) {
                $this->data['title'] = "Danh sách video mới";
            } else {
                $this->data['title'] = 'Chưa có dữ liệu';
            }
            $this->data['pagination'] = $this->pagination->create_links();
        } else {
            redirect('');
        }
        $this->data['description'] = 'Dánh sách các Video mới';
        $this->template->build('frontend/video/news', $this->data);
    }

}
