<?php

class Menu extends Backend_Controller {

    private $type_filter;

    public function __construct() {
        parent::__construct();
        $this->data['page'] = 'Menu';
        $this->load->model('menu_model');
    }

    public function index() {
        $this->data['title'] = 'Quản lý menu';
        $this->data['menus'] = $this->menu_model->get_by(array('status' => 1));
        $this->template->build('backend/menu/index', $this->data);
        $this->output->cache(1);
    }

    public function trash() {
        $this->data['title'] = 'Danh sách thùng giác';
        $this->data['trashs'] = $this->menu_model->get_by(array('status' => 0));
        $this->template->build('backend/menu/trash', $this->data);
    }

    public function edit($id = NULL) {
        //Fetch a page or set a new on
        if ($id) {
            $this->data['title'] = 'Cập nhập thông tin menu';
            $data = $this->menu_model->get_by(array('status' => 1, 'id' => $id), TRUE);
            $this->data['menu'] = $data;
            count($this->data['menu']) || $this->data['errors'][] = 'Không tìm thấy menu';
            $selected = $data->parent_id;
        } else {
            $selected = 0;
            $this->data['title'] = 'Thêm mới menu';
            $this->data['menu'] = $this->menu_model->get_new();
        }
        // Hiển thị menu cha
        if ($this->input->post('parent_id')) {
            $selected = $this->input->post('parent_id');
        }
        //$this->load->library('recursive');
        $categories = $this->menu_model->get_by(array('status' => 1));

        //Fetch data to database on dropdown order
        $dropdown = $this->recursive->dropdown($categories, $selected);
        $this->data['select'] = $dropdown;

        // Fill data to array postion on dropdown position
        $this->data['position'] = $this->recursive->position();

        $rules = $this->menu_model->rules;
        $this->form_validation->set_rules($rules);
        if ($this->form_validation->run() == TRUE) {
            $data = $this->array_from_post(array('name', 'parent_id', 'position'));
            $data['status'] = 1;
            $data['slug'] = toSlug($this->input->post('name'));
            $id == null ? $data['order'] = $this->menu_model->get_order() : '';
            $this->menu_model->save($data, $id);
            redirect('nevergiveup/menu');
        }
        $this->template->build('backend/menu/edit', $this->data);
    }

    function _unique_name($str) {
        $id = $this->uri->segment(4);
        $this->db->where('name', $this->input->post('name'));
        !$id || $this->db->where('id !=', $id);
        $menu = $this->menu_model->get();
        if (count($menu)) {
            $this->form_validation->set_message('_unique_name', '%s đã tồn tại');
            return FALSE;
        }
        return TRUE;
    }
    /**
     * function delete and recovery
     * @param type $id
     */
    public function delete($id) {
        $data['status'] = 0;
        $this->menu_model->save($data, $id);
        redirect('nevergiveup/menu');
    }

    public function recovery($id) {
        $data['status'] = 1;
        $this->menu_model->save($data, $id);
        redirect('nevergiveup/menu');
    }

    public function order_ajax() {
        // Save order from ajax call
        if (isset($_POST['sortable'])) {
            $this->menu_model->save_order($_POST['sortable']);
        }
        //Fetch data by status=1
        $data = $this->menu_model->get_by(array('status' => 1));

        //Load multi array to library Recursive
        $this->data['menus'] = $this->recursive->get_nested($data);
        // Load view
        $this->load->view('backend/menu/order_ajax', $this->data);
    }

    public function sort() {
        $this->data['title'] = 'Sắp xếp menu';
        $this->data['sortable'] = TRUE;
        $this->template->build('backend/menu/sort', $this->data);
    }

    public function test() {
        $data = $this->menu_model->get_by(array('status' => 1));
        $this->data['test'] = $this->menu_model->_flat_to_nested($data);
        $this->template->build('backend/menu/test', $this->data);
    }
}

?>
