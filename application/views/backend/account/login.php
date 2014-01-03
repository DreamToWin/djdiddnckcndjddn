<div class="wrapper">
    <h1>
        <a href="<?php echo base_url(); ?>">
            <img src="<?php echo site_url('publics/backend/img/logo-big.png'); ?>" alt="Logo" class='retina-ready' width="59" height="49">123Xem.vn</a>
    </h1>
    <div class="login-body">
        <h2>Đăng nhập hệ thống</h2>
        <?php echo isset($message_login) ? $message_login : '';?>
        <form action="<?php echo base_url('nevergiveup/account/login'); ?>" method='POST'>
            <div class="email">
                <input type="text" value="<?php echo isset($_POST['email']) ? $_POST['email'] : '' ;?>" name='email' placeholder="Địa chỉ email" class='input-block-level'>
                <?php echo form_error('email'); ?>
            </div>
            <div class="pw">
                <input type="password" name="password" placeholder="Mật khẩu" class='input-block-level'>
                <?php echo form_error('password'); ?>
            </div>
            <div class="submit">
                <input type="submit" value="Đăng nhập" class='btn btn-primary'>
            </div>
        </form>
        <div class="forget">
            <a href="#"><span>Bạn quên mật khẩu?</span></a>
        </div>    
    </div>
</div>