<?php

$this->load->view('layouts/frontend/component/header');
echo $template['body'];

if ($sidebar !== '') {
    $this->load->view('layouts/frontend/component/sidebar_' . $sidebar);
}
$this->load->view('layouts/frontend/component/footer');
?>