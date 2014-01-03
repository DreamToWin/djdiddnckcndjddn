<?php

class Contact extends Frontend_Controller {

    function __construct() {
        parent::__construct();
        $this->data['sidebar'] = 'adv';
    }

    function index() {
        $this->load->model('contact_model');
        $rules = $this->contact_model->rules;
        $this->form_validation->set_rules($rules);
        if ($this->form_validation->run() === TRUE) {
            $data = $this->array_from_post(array('name', 'email', 'title', 'content'));
            $data['status'] = 1;
            $data['contact_date'] = getNowTimestamp();
            $result = $this->contact_model->save($data);
            if ($result > 0) {
                $message = alertMessage('Thành công', 'Bạn đã gửi liên hệ thành công.!', 'success');
                $this->session->set_flashdata('message', $message);
                captcha();
                redirect('contact');
            } else {
                $this->data['message'] = alertMessage('Có lỗi', 'Có lỗi xảy ra. Bạn vui lòng thử lại sau!');
            }
        } else {
            captcha();
        }
        $this->data['description'] = 'Nếu có bất cứ thắc mắc gì bạn hãy gửi liên hệ cho chúng tôi. Chúng tôi sẽ trả lời bạn trong thời gian sớm nhất';
        $this->template->build('frontend/contact/index', $this->data);
    }

    function _check_answer($answer) {
        $this->form_validation->set_message('_check_answer', 'Câu trả lời không chính xác!');
        $tmp = checkAnswerCatpcha($answer);
        captcha();
        return $tmp;
    }





    function test()
    {
        // Load library
        $this->load->library('memcached_library');
        
        // Lets try to get the key
        $results = $this->memcached_library->get('test');
        
        // If the key does not exist it could mean the key was never set or expired
        if (!$results) 
        {
            // Modify this Query to your liking!
            $query = $this->db->get('category', 100);
            
            // Lets store the results
            $this->memcached_library->add('test', $query->result(), 1200);
            
            // Output a basic msg
            echo "Alright! Stored some results from the Query... Refresh Your Browser";
        }
        else 
        {
            // Output
            var_dump($results);
            
            // Now let us delete the key for demonstration sake!
            //$this->memcached_library->delete('test');
        }
        echo 'test';
        
    }
    
    function stats()
    {
        $this->load->library('memcached_library');
        
        var_dump($this->memcached_library->getversion());
        echo "<br/>";
        
        // We can use any of the following "reset, malloc, maps, cachedump, slabs, items, sizes"
        $p = $this->memcached_library->getstats("sizes");
        
        var_dump($p);
    }

}

?>
