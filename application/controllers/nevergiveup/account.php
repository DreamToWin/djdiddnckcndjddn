<?php

class Account extends Backend_Controller {

    public function __construct() {
        parent::__construct();
        $this->data['page'] = 'Tài khoản';
    }

    function index() {
        $this->data['title'] = "Quản lý tài khoản";
        $this->data['accounts'] = $this->account_model->get();
        $this->template->build('backend/account/index', $this->data);
    }

    function edit($id = NULL) {
        $this->data['title'] = "Thêm mới tài khoản";
        $status_list = array(
            '1' => 'Kích hoạt',
            '2' => 'Không kích hoạt'
        );
        $type_list = array(
            '1' => 'Administrator',
            '2' => 'User'
        );
        $sex_list = array(
            '1' => 'Nam',
            '0' => 'Nữ'
        );
        $this->data['status_list'] = $status_list;
        $this->data['type_list'] = $type_list;
        $this->data['sex_list'] = $sex_list;

        // Fetch a user or set a new one
        if ($id) {
            $this->data['title'] = "Cập nhập tài khoản";
            $this->data['account'] = $this->account_model->get($id);
            count($this->data['account']) || $this->data['errors'][] = 'Tài khoản không tồn tại';
        } else {
            $this->data['account'] = $this->account_model->get_new();
        }
        // Set up the form
        $rules = $this->account_model->rules_admin;
        $id || $rules['password']['rules'] .= '|required';
        $this->form_validation->set_rules($rules);
        // Process the form
        if ($this->form_validation->run() == TRUE) {
            $data = $this->array_from_post(array('username', 'email', 'password', 'fullname', 'birthday', 'sex', 'phone', 'address', 'created_on', 'type', 'status'));
            if ($data['password'] == null) {
                unset($data['password']);
            } else {
                $data['password'] = $this->account_model->hash($data['password']);
                $data['created_on'] = time();
            }
            $this->account_model->save($data, $id);
            redirect('nevergiveup/account');
        }
        $this->template->build('backend/account/edit', $this->data);
    }

    function login() {
        // Chuyển trang nếu đăng nhập rồi
        $dashboard = 'nevergiveup';
        if($this->account_model->loggedin()){
            redirect($dashboard);
        }

        // Các luật kiểm tra dữ liệu
        $rules = $this->account_model->rules;
        $this->form_validation->set_rules($rules);

        // Xử lý form
        if ($this->form_validation->run() == TRUE) {
            $email = $this->input->post('email');
            $password = $this->input->post('password');
            //Kiểm tra xem có đúng thôn tin tài khoản không

            if ($this->account_model->login($email, $password, 1) == TRUE) {
                redirect($dashboard);
            } else {
                $this->data['message_login'] = alertMessage('Có lỗi', 'Email hoặc mật khẩu không chính xác!');
            }
        }
        $this->data['body'] = 'login';
        $this->template->set_layout('backend_base');
        $this->template->build('backend/account/login', $this->data);
    }

    public function logout() {
        $this->account_model->logout();
        redirect('nevergiveup/account/login');
    }

    public function _unique_email() {
        // Do NOT validate if email already exists
        // UNLESS it's the email for the current user

        $id = $this->uri->segment(4);
        $this->db->where('email', $this->input->post('email'));
        !$id || $this->db->where('id !=', $id);
        $account = $this->account_model->get();

        if (count($account)) {
            $this->form_validation->set_message('_unique_email', '%s này đã tồn tại');
            return FALSE;
        }
        return TRUE;
    }

}
