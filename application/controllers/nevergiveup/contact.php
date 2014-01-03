<?php

class Contact extends Backend_Controller {

    public function __construct() {
        parent::__construct();
        $this->data['page'] = 'Liên hệ';
        $this->load->model('contact_model');
    }

    function inbox($status = NULL) {
        if (!is_null($status)) {
            $data = $this->contact_model->get_by(array('status' => $status));
            $this->data['status'] = $status;
        } else {
            $this->data['status'] = 'Tất cả thư';
            $data = $this->contact_model->get();
        }
        $this->data['title'] = 'Quản lý thư liên hệ';
        $this->data['contents'] = $data;
        $this->template->build('backend/contact/inbox', $this->data);
    }

    public function reply_message() {
        $rules = $this->contact_model->rules_backend;
        $this->form_validation->set_rules($rules);
        if ($this->form_validation->run() === TRUE) {
            if ($this->input->post('id')) {
                $contact = $this->contact_model->get($this->input->post('id'));
                $data = $this->array_from_post(array('content'));
                $data['id_contact'] = $contact->id;
                $data['title'] = $contact->title;
                $data['reply_date'] = time();
                $data['account_id'] = $this->session->userdata('id');
                $this->session->set_flashdata('id', $contact->id);
                $subject = 'no-reply: ' . $contact->title;
                if ($this->mail->sendmail($contact->email, $subject, $this->input->post('content'), NULL) > 0) {
                    $this->contact_model->savemessage($data);
                    if ($this->contact_model->save(array('status' => 3), $contact->id) > 0) {
                        $message = alertMessage('Thành công', 'Bạn đã trả lời liên hệ thành công', 'success');
                        $this->session->set_flashdata('message', $message);
                        redirect('nevergiveup/contact/message/' . $contact->id);
                    } else {
                        $this->data['message'] = alertMessage('Có lỗi', 'Vui lòng kiểm tra lại');
                    }
                } else {
                    $this->data['message'] = alertMessage('Có lỗi', 'Gửi mail xảy ra vấn đề');
                }
            }
        }
    }

    function delete($id) {
        $data = array('status' => 4);
        $this->contact_model->save($data, $id);
        redirect('nevergiveup/contact/inbox/');
    }

    function recover($id) {
        $data = array('status' => 3);
        $this->contact_model->save($data, $id);
        redirect('nevergiveup/contact/inbox/');
    }

    function remover($id) {
        if (isset($id) && is_numeric($id)) {
            $this->contact_model->delete($id);
            redirect('nevergiveup/contact/inbox/');
        }
    }

    function message($id) {
        $data = $this->contact_model->get($id);
        if (count($data)) {
            if ($data->status == 1) {
                $update = array(
                    'status' => 2
                );
                $this->contact_model->save($update, $id);
            }
            $this->data['contact'] = $data;
        }
        $reply = $this->contact_model->get_reply($id);
        if (count($reply)) {
            $this->data['reply'] = $reply;
        }
        $this->data['title'] = 'Thông tin phản hồi';
        $this->template->build('backend/contact/message', $this->data);
    }

}

?>
