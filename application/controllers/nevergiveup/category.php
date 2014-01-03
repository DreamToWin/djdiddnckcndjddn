<?php

class Category extends Backend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('category_model');
        $this->data['page'] = 'Chuyên mục';
    }

    public function index() {
        $this->data['title'] = 'Quản lý chuyên mục';
        $this->data['categories'] = $this->category_model->get_with_parent();
        $this->template->build('backend/category/index', $this->data);
    }

    // Thùng rác
    public function trash() {
        $this->data['title'] = 'Danh sách thùng giác';
        $this->data['trashs'] = $this->category_model->get_by(array('status' => 0));
        $this->template->build('backend/category/trash', $this->data);
    }

    public function edit($id = NULL) {
        if ($id) {
            $this->data['title'] = 'Cập nhập thông tin chuyên mục';
            $data = $this->category_model->get_by(array('status' => 1, 'id' => $id), TRUE);
            $this->data['category'] = $data;
            count($this->data['category']) || $this->data['errors'][] = 'Không tìm thấy chuyên mục nào';
            $selected = $data->parent_id;
        } else {
            $selected = 0;
            $this->data['title'] = 'Thêm mới chuyên mục';
            $this->data['category'] = $this->category_model->get_new();
        }

        // Hiển thị chuyên mục
        if ($this->input->post('parent_id')) {
            $selected = $this->input->post('parent_id');
        }
        $categories = $this->category_model->get_by(array('status' => 1));

        $select = $this->recursive->dropdown($categories, $selected);
        $this->data['select'] = $select;

        // Kiểm tra dữ liệu
        $rules = $this->category_model->rules;
        $this->form_validation->set_rules($rules);
        if ($this->form_validation->run() == TRUE) {
            $data = $this->array_from_post(array('name', 'slug', 'parent_id', 'description', 'keyword'));
            $data['status'] = 1;
            $data['slug'] = toSlug($this->input->post('name'));
            $id == null ? $data['order'] = $this->category_model->get_order() : 1;
            $this->category_model->save($data, $id);
            redirect('nevergiveup/category');
        }
        $this->template->build('backend/category/edit', $this->data);
    }

    /**
     * function recovery,delete 
     * @param type $id
     */
    public function recovery($id) {
        $data['status'] = 1;
        $this->category_model->save($data, $id);
        redirect('nevergiveup/category');
    }

    public function delete($id) {
        $data['status'] = 0;
        $this->category_model->save($data, $id);
        redirect('nevergiveup/category');
    }
    
    /**
     * Sắp xếp vị trí hiển thị của chuyên mục
     * @param type $categories
     */
    function save_order($categories) {
        if (count($categories)) {
            foreach ($categories as $order => $category) {
                if ($category['item_id'] != '') {
                    $data = array('parent_id' => (int) $category['parent_id'], 'order' => $order);
                    $this->category_model->save($data, $category['item_id']);
                }
            }
        }
    }

    public function order_ajax() {
        // Save order from ajax call
        if (isset($_POST['sortable'])) {
            $this->category_model->save_order($_POST['sortable']);
        }
        
        $data = $this->category_model->get_by(array('status' => 1));
        $this->data['categories'] = $this->recursive->get_nested($data);
        // Load view
        $this->load->view('backend/category/order_ajax', $this->data);
    }

    public function sort() {
        $this->data['title'] = 'Sắp xếp chuyên mục';
        $this->data['sortable'] = TRUE;
        $this->template->build('backend/category/sort', $this->data);
    }
    
    public function gen_ul(){
        $data = $this->category_model->get_by(array('status' => 1));
        $this->data['categories'] = $this->recursive->get_nested($data);
        // Load view
        $this->template->build('backend/category/gen_ul', $this->data);
    }

    // Kiểm tra sự tồn tại của tên
    public function _unique_name($str) {
        $id = $this->uri->segment(4);
        $this->db->where('name', $this->input->post('name'));
        !$id || $this->db->where('id !=', $id);
        $page = $this->category_model->get();
        if (count($page)) {
            $this->form_validation->set_message('_unique_name', '%s đã tồn tại');
            return FALSE;
        }
        return TRUE;
    }
}

?>
