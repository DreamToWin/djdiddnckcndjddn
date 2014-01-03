<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Account extends Frontend_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('account_model');
        $this->config->load('config_facebook');
        $this->facebook = new Facebook(array('appId' => $this->config->item('appID'), 'secret' => $this->config->item('appSecret')));
    }

    function index() {
        captcha();
        $this->data['title'] = 'Tài khoản trên 123xem.vn';
        $this->data['description'] = 'Tài khoản trên 123xem.vn cho phép bạn đăng video và quản lý video của mình. Nếu bạn sử dụng Facebook có thể kết nối với tài khoản Facebook để đăng ký và đăng nhập';
        $this->template->build('frontend/account/index', $this->data);
    }

    function register() {
        $rules = $this->account_model->rules_register;
        $this->form_validation->set_rules($rules);
        if ($this->form_validation->run() === TRUE) {
            $data = $this->array_from_post(array('email', 'password', 'username'));
            $data['password'] = $this->account_model->hash($data['password']);
            $data['type'] = 2;
            $data['status'] = 1;
            $data['created_on'] = getNowTimestamp();
            if ($this->account_model->save($data) > 0) {
                $message = alertMessage('Thành công', 'Chúc mừng bạn đã đăng ký thành công!', 'success');
                $this->session->set_flashdata('message', $message);
                $this->auth->logout();
                captcha();
                redirect('account');
            } else {
                $this->data['message'] = alertMessage('Có lỗi', 'Có lỗi xảy ra. Bạn vui lòng thử lại!');
            }
        } else {
            captcha();
        }
        $this->data['title'] = 'Đăng ký bị lỗi. Bạn vui lòng kiểm tra lại';
        $this->data['description'] = 'Tài khoản trên 123xem.vn cho phép bạn đăng video và quản lý video của mình. Nếu bạn sử dụng Facebook có thể kết nối với tài khoản Facebook để đăng ký và đăng nhập';
        $this->template->build('frontend/account/index', $this->data);
    }

    function login() {
        $rules = $this->account_model->rule_login;
        $this->form_validation->set_rules($rules);
        if ($this->form_validation->run() === TRUE) {
            $email = $this->input->post('email_login');
            $password = $this->input->post('password_login');
            if ($this->account_model->login_frontend($email, $password) === TRUE) {
                $remember = $this->input->post('remember') ? TRUE : FALSE;
                $this->auth->login($this->session->userdata('auth_user'), $remember);
                redirect($this->input->get('to'));
            } else {
                $this->data['message_login'] = alertMessage('Có lỗi', 'Email hoặc mật khẩu không chính xác!');
            }
        }
        $this->data['title'] = 'Đăng nhập bị lỗi. Bạn vui lòng kiểm tra lại tài khoản';
        $this->data['description'] = 'Tài khoản trên 123xem.vn cho phép bạn đăng video và quản lý video của mình. Nếu bạn sử dụng Facebook có thể kết nối với tài khoản Facebook để đăng ký và đăng nhập';
        $this->template->build('frontend/account/index', $this->data);
    }

    function login_facebook() {
        $user = $this->facebook->getUser();
        if ($user) {
            try {
                $profile = $this->facebook->api('/me');
                if (isset($profile['email'])) {
                    if ($this->_unique_email($profile['email'])) {
                        $username = $profile['username'];
                        if (!$this->_unique_username($username)) {
                            $username .= '.' . random_key(4);
                        }
                        $fullname = $profile['first_name'] . ' ' . $profile['last_name'];
                        $sex = 1;
                        if (isset($profile['gender']) && $profile['gender'] == 'Female') {
                            $sex = 0;
                        }

                        $img = file_get_contents('https://graph.facebook.com/' . $profile['id'] . '/picture?type=square');
                        $avatar = "account/avatar/{$username}.jpg";
                        $file = PUBLICSPATH . $avatar;
                        file_put_contents($file, $img);
                        $data = array(
                            'username' => $username,
                            'nickname' => $fullname,
                            'email' => $profile['email'],
                            'fullname' => $fullname,
                            'type' => 2,
                            'created_on' => getNowTimestamp(),
                            'birthday' => getTimestamp($profile['birthday']),
                            'status' => 1,
                            'sex' => $sex,
                            'avatar' => 'publics/' . $avatar
                        );
                        $this->account_model->save($data);
                    }
                } else {
                    redirect();
                }
                $data = $this->account_model->get_by(array('email' => $profile['email']), TRUE);
                $this->account_model->save_session($data);
                $this->auth->login($data->id, TRUE);
            } catch (Exception $e) {
                $this->log->write_log($e->getMessage() . ' Dong ' . $e->getLine());
                $user = null;
            }
        }
        redirect('');
    }

    function logout() {
        $this->auth->logout();
        redirect('account');
    }

    function profile() {
        if (!$this->auth->loggedin()) {
            redirect('account');
        }
        $this->data['title'] = 'Đổi thông tin cá nhân';
        $id = $this->auth->userid();
        $this->data['id'] = $id;
        if ($this->input->post('id')) {
            $rules = $this->account_model->rules_profile;
            $this->form_validation->set_rules($rules);
            if ($this->form_validation->run() === TRUE) {
                $data = $this->array_from_post(array('nickname', 'fullname', 'birthday', 'sex', 'phone', 'address'));
                $data['birthday'] = getTimestamp($data['birthday']);
                $result = $this->account_model->save($data, $id);
                if ($result > 0) {
                    $message = alertMessage('Thành công', 'Bạn đã thay đổi thành công.', 'success');
                    $this->session->set_userdata('nickname', $data['nickname']);
                    $this->session->set_flashdata('message', $message);
                    redirect('account/profile');
                } else {
                    $this->data['message'] = alertMessage('Có lỗi', 'Có lỗi xảy ra. Bạn vui lòng thử lại sau!');
                }
            } else {
                $data = $this->account_model->get_new();
                $data->sex = $this->input->post('sex');
                $this->data['account'] = $data;
            }
        } else {
            $data = $this->account_model->get($id);
            $data->birthday = getConvetDate($data->birthday, 'm/d/Y');
            count($data) || redirect('errors/404.html');
            $this->data['account'] = $data;
        }
        $this->data['description'] = 'Bạn có thể thay đổi thông tin cá nhân phù hợp với thông tin của bạn.';
        $this->template->build('frontend/account/profile', $this->data);
    }

    function password() {
        if (!$this->auth->loggedin()) {
            redirect('account');
        }
        $this->data['title'] = 'Thay đổi mật khẩu cá nhân';
        $id = $this->auth->userid();
        $this->data['id'] = $id;
        if ($this->input->post('id')) {
            $rules = $this->account_model->rules_frontend_password;
            $this->form_validation->set_rules($rules);
            if ($this->session->userdata('old') === TRUE) {
                $this->form_validation->set_rules('old', 'Mật khẩu cũ', 'required|callback__checkpassword_old');
            }
            if ($this->form_validation->run() === TRUE) {
                $password = $this->input->post('new');
                $data['password'] = $this->account_model->hash($password);
                $result = $this->account_model->save($data, $id);
                if ($result > 0) {
                    $message = alertMessage('Thành công', 'Bạn đã thay đổi thành công.', 'success');
                    $this->session->set_flashdata('message', $message);
                    $this->session->unset_userdata('old');
                    redirect('account/password');
                } else {
                    $this->data['message'] = alertMessage('Có lỗi', 'Có lỗi xảy ra. Bạn vui lòng thử lại sau!');
                }
            }
        } else {
            $data = $this->account_model->get($id);
            if ($data->password != '') {
                $this->session->set_userdata('old', true);
            }
        }
        $this->data['description'] = 'Bạn có thể đổi mật khẩu để bảo vệ tài khoản của mình';
        $this->template->build('frontend/account/password', $this->data);
    }

    function _check_answer($answer) {
        $this->form_validation->set_message('_check_answer', 'Câu trả lời không chính xác!');
        $tmp = checkAnswerCatpcha($answer);
        captcha();
        return $tmp;
    }

    public function _unique_email($email) {
        $this->db->where('email', $email);
        $account = $this->account_model->get();
        if (count($account)) {
            $this->form_validation->set_message('_unique_email', '%s này đã tồn tại');
            return FALSE;
        }
        return TRUE;
    }

    public function _unique_username($username, $id = null) {
        if ($id != null) {
            $this->db->where('id != ', $id);
        }
        $this->db->where('username', $username);
        $account = $this->account_model->get();
        if (count($account)) {
            $this->form_validation->set_message('_unique_username', '%s này đã tồn tại');
            return FALSE;
        }
        return TRUE;
    }

    public function _checkpassword_old($password) {
        $this->form_validation->set_message('_checkpassword_old', '%s không chính xác');
        $tmp = FALSE;
        $hash = $this->account_model->hash($password);
        $id = $this->auth->userid();
        $this->db->where(array('password' => $hash, 'id' => $id));
        $account = $this->account_model->get();
        if (count($account)) {
            $tmp = TRUE;
        }
        return $tmp;
    }

}

?>
