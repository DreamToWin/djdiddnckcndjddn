<?php

class Menu_Model extends MY_Model {

    protected $_table_name = 'menu';
    protected $_order_by = 'parent_id, order';
    public $rules = array(
        'name' => array(
            'field' => 'name',
            'label' => 'Menu',
            'rules' => 'trim|required|min_length[3]|max_length[100]|callback__unique_name|xss_clean|'
        ),
        'parent_id' => array(
            'field' => 'parent_id',
            'label' => 'Menu cha',
            'rules' => 'trim|intval'
        )
    );

    function get_new() {
        $menu = new stdClass();
        $menu->name = '';
        $menu->parent_id = 0;
        $menu->position = 0;
        return $menu;
    }

    public function save_order($menus) {
        if (count($menus)) {
            foreach ($menus as $order => $menu) {
                if ($menu['item_id'] != '') {
                    $data = array('parent_id' => (int) $menu['parent_id'], 'order' => $order);
                    $this->db->set($data)->where($this->_primary_key, $menu['item_id'])->update($this->_table_name);
                }
            }
        }
    }

    //function get_order
    function get_order() {
        $this->db->limit(1);
        $this->db->select('order');
        $this->db->order_by('order desc');
        $result = $this->db->get('menu')->row();
        $order = count($result) ? $result->order + 1 : 1;
        return $order;
    }

// function get_menu
    function get_menu() {
        $this->db->order_by($this->_order_by);
        $this->db->where(array('status' => 1));
        $menus = $this->db->get('menu')->result_array();
        return $menus;
    }

}
?>
