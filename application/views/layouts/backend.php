<?php

$this->load->view('layouts/backend/component/header');
$this->load->view('layouts/backend/component/sidebar');
$this->load->view('layouts/backend/component/navigation');
echo $template['body'];
$this->load->view('layouts/backend/component/footer');

?>
