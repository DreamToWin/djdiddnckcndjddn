<?php

class Account_Model extends MY_Model {

    protected $_table_name = 'account';
    protected $_order_by = 'id';
    protected $_primary_key = 'id';

    function __construct() {
        parent::__construct();
    }

    public $rules = array(
        'email' => array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => 'trim|required|valid_email|xss_clean'
        ),
        'password' => array(
            'field' => 'password',
            'label' => 'Mật khẩu',
            'rules' => 'trim|required'
        )
    );
    public $rules_admin = array(
        'username' => array(
            'field' => 'username',
            'label' => 'Tên hiển thị',
            'rules' => 'trim|required|xss_clean'
        ),
        'email' => array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => 'trim|required|valid_email|callback__unique_email|xss_clean'
        ),
        'password' => array(
            'field' => 'password',
            'label' => 'Mật khẩu',
            'rules' => 'trim|matches[confirmpassword]'
        ),
        'confirmpassword' => array(
            'field' => 'confirmpassword',
            'label' => 'Nhập lại mật khẩu',
            'rules' => 'trim|matches[password]'
        ),
        'fullname' => array(
            'field' => 'fullname',
            'label' => 'Họ tên',
            'rules' => 'trim|required|xss_clean'
        ),
        'birthday' => array(
            'field' => 'birthday',
            'label' => 'Ngày sinh',
            'rules' => 'required'
        ),
        'phone' => array(
            'field' => 'phone',
            'label' => 'Số điện thoại',
            'rules' => 'required|regex_match[/^[0-9]+$/]|xss_clean'
        )
    );
    public $rules_pass = array(
        'passwordold' => array(
            'field' => 'passwordold',
            'label' => 'Mật khẩu cũ',
            'rules' => 'trim|required'
        ),
        'passwordnew' => array(
            'field' => 'passwordnew',
            'label' => 'Mật khẩu mới',
            'rules' => 'trim|matches[confirm]'
        ),
        'confirm' => array(
            'field' => 'confirm',
            'label' => 'Nhập lại mật khẩu',
            'rules' => 'trim|matches[passwordnew]'
        )
    );
    // Frontend
    public $rule_login = array(
        'email_login' => array(
            'field' => 'email_login',
            'label' => 'Email',
            'rules' => 'trim|required|valid_email|xss_clean'
        ),
        'password_login' => array(
            'field' => 'password_login',
            'label' => 'Mật khẩu',
            'rules' => 'trim|required'
        )
    );
    public $rules_register = array(
        'username' => array(
            'field' => 'username',
            'label' => 'Tên tài khoản',
            'rules' => 'trim|required|regex_match[/^[a-zA-Z0-9.]+$/]|min_length[4]|max_length[50]|xss_clean|callback__unique_username'
        ),
        'email' => array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => 'trim|required|valid_email|callback__unique_email|xss_clean'
        ),
        'password' => array(
            'field' => 'password',
            'label' => 'Mật khẩu',
            'rules' => 'trim|required'
        ),
        'confirm' => array(
            'field' => 'confirm',
            'label' => 'Nhập lại mật khẩu',
            'rules' => 'trim|matches[password]'
        ),
        'captcha' => array(
            'field' => 'captcha',
            'label' => 'Mã kiểm tra',
            'rules' => 'trim|required|numeric|callback__check_answer'
        )
    );
    public $rules_profile = array(
        'nickname' => array(
            'field' => 'nickname',
            'label' => 'Tên hiển thị',
            'rules' => 'trim|min_length[6]|max_length[50]|xss_clean'
        ),
        'fullname' => array(
            'field' => 'fullname',
            'label' => 'Họ tên',
            'rules' => 'trim|required|xss_clean'
        ),
        'birthday' => array(
            'field' => 'birthday',
            'label' => 'Ngày sinh',
            'rules' => 'required|max_length[10]'
        ),
        'sex' => array(
            'field' => 'sex',
            'label' => 'Giới tính',
            'rules' => 'trim'
        ),
        'phone' => array(
            'field' => 'phone',
            'label' => 'Điện thoại',
            'rules' => 'required|regex_match[/^[0-9]+$/]|xss_clean'
        ),
        'address' => array(
            'field' => 'address',
            'label' => 'Địa chỉ',
            'rules' => 'trim|required|min_length[6]|max_length[255]|xss_clean'
        ),
    );
    public $rules_frontend_password = array(
        'new' => array(
            'field' => 'new',
            'label' => 'Mật khẩu mới',
            'rules' => 'trim|required|min_length[6]'
        ),
        'confirm' => array(
            'field' => 'confirm',
            'label' => 'Nhập lại mật khẩu',
            'rules' => 'trim|matches[new]'
        )
    );

    public function login($email, $password, $type) {
        $tmp = false;
        $where = array(
            'email' => $email,
            'password' => $this->hash($password),
            'type' => $type,
            'status' => 1
        );
        $account = $this->get_by($where, TRUE);
        if (count($account)) {
            $data = array(
                'username' => $account->username,
                'fullname' => $account->fullname,
                'email' => $account->email,
                'id' => $account->id,
                'type' => $type,
                'loggedin' => TRUE
            );
            $tmp = true;
            $this->session->set_userdata($data);
        }
        return $tmp;
    }

    public function logout() {
        $this->session->sess_destroy();
    }

    public function loggedin() {
        return (bool) $this->session->userdata('loggedin');
    }

    // Clear textfield
    public function get_new() {
        $account = new stdClass();
        $account->username = '';
        $account->nickname = '';
        $account->email = '';
        $account->password = '';
        $account->fullname = '';
        $account->birthday = '';
        $account->phone = '';
        $account->address = '';
        $account->status = 1;
        $account->type = 1;
        $account->sex = 1;
        return $account;
    }

    // Encode password
    function hash($string) {
        return hash('sha512', $string . config_item('encryption_key'));
    }

    // FRONT END
    public function login_frontend($email, $password) {
        $tmp = false;
        $where = array(
            'email' => $email,
            'password' => $this->hash($password),
            'type' => 2,
            'status' => 1
        );
        $account = $this->get_by($where, TRUE);
        if (count($account)) {
            $this->save_session($account);
            $tmp = true;
        }
        return $tmp;
    }

    public function save_session($account = null, $where = null) {
        if ($where != null) {
            $account = $this->get_by($where, TRUE);
        }
        if (count($account)) {
            
            $data = array(
                'username' => $account->username,
                'email' => $account->email,
                'auth_user' => $account->id,
                'type' => $account->type,
                'nickname' => $account->nickname
            );
            $tmp = true;
            $this->session->set_userdata($data);
        }
    }
    
    function get_id($username){
        $this->db->select('id');
        $id = $this->get_by(array('username' => $username), TRUE);
        if($id == null){
            return false;
        }
        return $id->id;
    }
    
    
}
?>
