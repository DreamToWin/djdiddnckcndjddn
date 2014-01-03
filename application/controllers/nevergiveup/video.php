<?php

class Video extends Backend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('video_model');
        $this->data['page'] = 'Vi phạm';
    }

    function index($status = NULL) {
        $this->data['title'] = 'Quản lý video vi phạm';
        $this->data['videos'] = $this->video_model->get_by('violation > 0 and status = 1');
        $this->template->build('backend/video/index', $this->data);
    }

    function delete($id) {
        if (is_numeric($id)) {
            $data = array('status' => 3);
            if ($this->video_model->save($data, $id) > 0) {
                $message = alertMessage('Thành công', 'Bạn đã xóa thành công video vi phạm. Bạn có thể khôi phục lại trong thùng rác', 'success');
                $this->session->set_flashdata('message', $message);
                redirect('nevergiveup/video/');
            }
        }
    }

    function strash() {
        $this->data['videos'] = $this->video_model->get_by(array('status' => 3));
        $this->template->build('backend/video/strash', $this->data);
    }

    function remover($id) {
        if ($this->video_model->delete($id) > 0) {
            $message = alertMessage('Thành công', 'Bạn đã xóa thành công video vi phạm.', 'success');
            $this->session->set_flashdata('message', $message);
            redirect('nevergiveup/video/');
        }
    }

    function detail($id) {
        if (is_numeric($id)) {
            $this->data['detail'] = $this->video_model->get($id);
            $this->template->build('backend/video/detail', $this->data);
        }
    }

}

?>
