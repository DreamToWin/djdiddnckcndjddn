<!doctype html>
<html>
    <head>
        <meta charset="utf8">
        <title><?php echo isset($title) ? $title : 'Dashboard'; ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <!-- Apple devices fullscreen -->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <!-- Apple devices fullscreen -->
        <meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <!-- Bootstrap -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/bootstrap.min.css'); ?>">
        <!-- Bootstrap responsive -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/bootstrap-responsive.min.css'); ?>">
        <!-- jQuery UI -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/plugins/jquery-ui/smoothness/jquery-ui.css'); ?>">
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/plugins/jquery-ui/smoothness/jquery.ui.theme.css'); ?>">
        <!-- Theme CSS -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/style.css'); ?>">
        <!-- Color CSS -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/cutomer_daolv.css'); ?>">


        <!-- jQuery and jQuery UI-->
        <script src="<?php echo site_url('publics/backend/js/jquery.min.js'); ?>"></script>
        <script src="<?php echo site_url('publics/backend/js/plugins/jquery-ui/jquery-ui-1.9.2.custom.js'); ?>"></script>

        <!-- slimScroll -->
        <script src="<?php echo site_url('publics/backend/js/plugins/slimscroll/jquery.slimscroll.min.js'); ?>"></script>
        <!-- Bootstrap -->
        <script src="<?php echo site_url('publics/backend/js/bootstrap.min.js'); ?>"></script>
        <!-- Bootbox -->
        <script src="<?php echo site_url('publics/backend/js/plugins/bootbox/jquery.bootbox.js'); ?>"></script>
        <!-- Bootbox -->
        <script src="<?php echo site_url('publics/backend/js/plugins/form/jquery.form.min.js'); ?>"></script>
        <!-- Validation -->
        <script src="<?php echo site_url('publics/backend/js/plugins/validation/jquery.validate.min.js'); ?>"></script>
        <script src="<?php echo site_url('publics/backend/js/plugins/validation/additional-methods.min.js'); ?>"></script>

        <!-- dataTables -->
        <script src="<?php echo site_url('publics/backend/js/plugins/datatable/jquery.dataTables.min.js'); ?>"></script>
        <script src="<?php echo site_url('publics/backend/js/plugins/datatable/TableTools.min.js'); ?>"></script>
        <script src="<?php echo site_url('publics/backend/js/plugins/datatable/ColReorder.min.js'); ?>"></script>
        <script src="<?php echo site_url('publics/backend/js/plugins/datatable/ColVis.min.js'); ?>"></script>
        
        
        <script src="<?php echo site_url('publics/backend/js/plugins/ckeditor/ckeditor.js'); ?>"></script>
        <script src="<?php echo site_url('publics/backend/js/plugins/ckeditor/config.js'); ?>"></script>
        

        <!-- Theme framework -->
        <script src="<?php echo site_url('publics/backend/js/eakroko.min.js'); ?>"></script>
        <!-- Theme scripts -->
        <script src="<?php echo site_url('publics/backend/js/application.min.js'); ?>"></script>
        <!-- Just for demonstration -->
        <script src="<?php echo site_url('publics/backend/js/demonstration.min.js'); ?>"></script>
        <!-- Favicon -->
        <link rel="shortcut icon" href="<?php echo site_url('publics/backend/img/favicon.ico'); ?>" />
        <!-- Apple devices Homescreen icon -->
        <link rel="apple-touch-icon-precomposed" href="<?php echo site_url('publics/backend/img/apple-touch-icon-precomposed.png'); ?>" />
    </head>

    <body>
        <div id="navigation">
            <div class="container-fluid">
                <a href="#" id="brand">FLAT</a>
                <a href="#" class="toggle-nav" rel="tooltip" data-placement="bottom" title="Toggle navigation"><i class="icon-reorder"></i></a>
                <ul class='main-nav'>
                    <li <?php echo activeTopMenu('') ?>>
                        <a href="<?php echo site_url('nevergiveup'); ?>">
                            <i class="icon-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li <?php echo activeTopMenu('account') ?>>
                        <a href="" data-toggle="dropdown" class='dropdown-toggle'>
                            <i class="icon-edit"></i>
                            <span>Tài khoản</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li >
                                <a href="<?php echo site_url('nevergiveup/account'); ?>">Danh sách</a>
                            </li>
                            <li>
                                <a href="<?php echo site_url('nevergiveup/account/edit'); ?>">Thêm tài khoản</a>
                            </li>
                        </ul>
                    </li>

                    <li <?php echo activeTopMenu(array('menu', 'category')) ?>>
                        <a href="" data-toggle="dropdown" class='dropdown-toggle'>
                            <i class="icon-edit"></i>
                            <span>Quản lý chung</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li >
                                <a href="<?php echo site_url('nevergiveup/menu'); ?>">Danh sách menu</a>
                            </li>
                            <li>
                                <a href="<?php echo site_url('nevergiveup/menu/edit'); ?>">Thêm menu</a>
                            </li>
                            <li class="divider"></li>
                            <li >
                                <a href="<?php echo site_url('nevergiveup/category'); ?>">Danh chuyên mục</a>
                            </li>
                            <li>
                                <a href="<?php echo site_url('nevergiveup/category/edit'); ?>">Thêm chuyên mục</a>
                            </li>
                        </ul>
                    </li>

                    <li <?php echo activeTopMenu('contact','faq','page') ?>>
                        <a href="" data-toggle="dropdown" class='dropdown-toggle'>
                            <i class="icon-edit"></i>
                            <span>Quản lý trang</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="<?php echo site_url('nevergiveup/contact/inbox'); ?>">Hộp thư đến</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="<?php echo site_url('nevergiveup/faq'); ?>">FAQ</a>
                            </li>
                            <li class="divider"></li>
                            <li >
                                <a href="<?php echo site_url('nevergiveup/page'); ?>">Danh sách trang</a>
                            </li>
                            <li>
                                <a href="<?php echo site_url('nevergiveup/page/edit'); ?>">Thêm mới trang</a>
                            </li>
                             <li >
                                <a href="<?php echo site_url('nevergiveup/news'); ?>">Danh sách tin tức</a>
                            </li>
                            <li>
                                <a href="<?php echo site_url('nevergiveup/news/edit'); ?>">Thêm tin mới</a>
                            </li>
                        </ul>
                    </li>

                    <li <?php echo activeTopMenu('video') ?>>
                        <a href="" data-toggle="dropdown" class='dropdown-toggle'>
                            <i class="icon-edit"></i>
                            <span>Vi phạm</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="<?php echo site_url('nevergiveup/video'); ?>">Video vi phạm</a>
                            </li>
                            <li>
                                <a href="<?php echo site_url('nevergiveup/video/strash'); ?>">Thùng rác</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="user">
                    <div class="dropdown">
                        <a href="#" class='dropdown-toggle' data-toggle="dropdown"><?php echo $this->session->userdata('fullname'); ?> <img src="<?php echo site_url('publics/backend/img/demo/user-avatar.jpg'); ?>" alt=""></a>
                        <ul class="dropdown-menu pull-right">
                            <li>
                                <?php echo anchor('nevergiveup/account/changepassword/' . $this->session->userdata('id'), 'Đổi mật khẩu'); ?>
                            </li>
                            <li>
                                <?php echo anchor('nevergiveup/account/edit/' . $this->session->userdata('id'), 'Sửa thông tin'); ?>
                            </li>
                            <li>
                                <?php echo anchor('nevergiveup/account/logout', 'Thoát'); ?>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>