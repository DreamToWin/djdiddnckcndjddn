<!Doctype html>
<html>
    <head>
        <title><?php echo isset($title) ? $title : '123xem.vn'?></title>
        <meta charset="utf8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <!-- Apple devices fullscreen -->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <!-- Apple devices fullscreen -->
        <meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <!-- Bootstrap -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/bootstrap.min.css'); ?>">
        <!-- Bootstrap responsive -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/bootstrap-responsive.min.css'); ?>">
        <!-- Theme CSS -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/style.css'); ?>">
        <!-- Color CSS -->
        <link rel="stylesheet" href="<?php echo site_url('publics/backend/css/themes.css'); ?>">
        <!-- jQuery -->
        <script src="<?php echo site_url('publics/backend/js/jquery.min.'); ?>"></script>
        <!-- Bootstrap -->
        <script src="<?php echo site_url('publics/backend/js/bootstrap.min.js'); ?>"></script>
    </head>
    <body <?php echo isset($body) ? "class='login'" : ''?>>
        <?php echo $template['body']; ?>
    </body>
</html>
