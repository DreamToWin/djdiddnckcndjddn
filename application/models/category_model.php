<?php

class Category_Model extends MY_Model {

    protected $_table_name = 'category';
    protected $_primary_key = 'id';
    protected $_order_by = 'order';
    public $rules = array(
        'name' => array(
            'field' => 'name',
            'label' => 'Tiêu đề',
            'rules' => 'trim|required|min_length[3]|max_length[100]|callback__unique_name|xss_clean'
        ),
        'parent_id' => array(
            'field' => 'parent_id',
            'label' => 'Cấp độ',
            'rules' => 'trim|intval'
        ),
        'description' => array(
            'field' => 'description',
            'label' => 'Mô tả',
            'rules' => 'trim|required|min_length[5]|max_length[255]'
        ),
        'keyword' => array(
            'field' => 'keyword',
            'label' => 'Mô tả',
            'rules' => 'trim|required|min_length[5]|max_length[255]'
        )
    );

    function __construct() {
        parent::__construct();
    }

    function get_new() {
        $category = new stdClass();
        $category->name = '';
        $category->keyword = '';
        $category->parent_id = 0;
        $category->description = '';
        return $category;
    }

    public function get_with_parent($id = NULL, $single = FALSE) {
        $this->db->select('category.*, c.slug as parent_slug, c.name as parent_name');
        $this->db->join('category as c', 'category.parent_id=c.id', 'left');
        $this->db->where(array('category.status' => 1));
        return parent::get($id, $single);
    }

    function get_order() {
        $this->db->limit(1);
        $this->db->select('order');
        $this->db->order_by('order desc');
        $result = $this->db->get('category')->row();
        $order = count($result) ? $result->order + 1 : 1;
        return $order;
    }

    public function save_order($categorys) {
        if (count($categorys)) {
            foreach ($categorys as $order => $category) {
                if ($category['item_id'] != '') {
                    $data = array('parent_id' => (int) $category['parent_id'], 'order' => $order);
                    $this->db->set($data)->where($this->_primary_key, $category['item_id'])->update($this->_table_name);
                }
            }
        }
    }

    public function count_cate_by_slug($slug) {
        $this->_table_name = '';
        $this->db->select('COUNT(v.id) as num_recoder');
        $this->db->from('video as v');
        $this->db->join('category as c', 'v.category_id =  c.id');
        $this->db->where(array('c.slug' => $slug, 'v.status' => 1));
        $query = $this->db->get();
        return $query->row();
    }

    //Frontend
    public function get_cate_by_slug($slug, $limit, $start) {
         $sql = "SELECT SUM( `views` ) AS `total_view`,v.title, v.slug, v.video_id, v.post_date, v.status, c.name FROM statistics_view ";
        $sql .= "JOIN video as v ON statistics_view.video_id = v.id ";
        $sql .= "JOIN category as c ON v.category_id = c.id ";
        $sql .= "  WHERE c.slug = '{$slug}' AND v.status = 1 GROUP BY v.id ORDER BY v.id DESC LIMIT $start, $limit";
        $query = $this->db->query($sql);
        return $query->result();
        /*
        $this->_table_name = '';
        $this->db->select('');
        $this->db->limit($limit, $start);
        $this->db->from('video as v');
        $this->db->join('category as c', 'v.category_id = c.id');
        $this->db->where(array('c.slug' => $slug, 'v.status' => 1), FALSE, TRUE);
        $this->db->order_by("v.id", "desc");
        $query = $this->db->get();
        return $query->result();
         *
         */
    }

}
