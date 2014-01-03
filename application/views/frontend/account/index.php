<div class="col-lg-12 col-md-12 col-sm-12">
    <div class="panel panel-default">
        <div class="panel-heading hidden-xs">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-user"></i>
                Tài khoản
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-6 col-lg-6">
                    <h4>Đăng nhập tài khoản</h4>
                    <div class="row" id="login">
                        <div class="col-lg-12">
                            <?php
                            echo isset($message_login) ? $message_login : '';
                            $to = $this->input->get('to') ? "?to={$this->input->get('to')}" : '';
                            ?>
                            <form class="form-horizontal" role="form" method="POST" action="<?php echo site_url('account/login' . $to); ?>">
                                <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-4 control-label">Địa chỉ email</label>
                                    <div class="col-sm-8">
                                        <input type="email" name="email_login" value="<?php echo set_value('email_login'); ?>" class="form-control">
                                        <?php echo form_error('email_login'); ?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-4 control-label">Mật khẩu</label>
                                    <div class="col-sm-8">
                                        <input type="password" name="password_login"  class="form-control">
                                        <?php echo form_error('password_login'); ?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-4 col-sm-8">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="remember" value="1"> Nhớ trạng thái đăng nhập
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-4 col-sm-8">
                                        <button type="submit" class="btn btn-primary">Đăng nhập</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-4 col-sm-8">
                                        <p>Hoặc đăng nhập bằng</p>
                                        <a href="#" class="btn-custom btn-fb pull-left facebook_login">Facebook</a>
                                        <!--<a href="#" class="btn-custom btn-gl pull-left hidden-sm">Google</a>-->
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <hr class="visible-xs"/>
                <div class="col-sm-6 col-lg-6">
                    <h4>Đăng ký tài khoản</h4>
                    <div class="row" id="register">
                        <div class="col-lg-12">
                            <?php echo isset($message) ? $message : $this->session->flashdata('message'); ?>
                            <form class="form-horizontal" role="form" method="POST" action="<?php echo site_url('account/register'); ?>">
                                <div class="form-group">
                                    <label for="inputUsername" class="col-sm-4 control-label">Tên tài khoản</label>
                                    <div class="col-sm-8">
                                        <input type="text" name="username" class="form-control" value="<?php echo set_value('username'); ?>" placeholder="Có thể chứa (A-Z, 0-9) hoặc dấu chấm ('.')">
                                        <?php echo form_error('username'); ?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputEmai" class="col-sm-4 control-label">Địa chỉ email</label>
                                    <div class="col-sm-8">
                                        <input type="email" name="email" class="form-control" value="<?php echo set_value('email'); ?>" placeholder="Nhập đúng định dạng email">
                                        <?php echo form_error('email'); ?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-4 control-label">Mật khẩu</label>
                                    <div class="col-sm-8">
                                        <input type="password" name="password" class="form-control" placeholder="Tối thiểu 6 kí tự">
                                        <?php echo form_error('password'); ?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputConfirm" class="col-sm-4 control-label">Nhâp lại</label>
                                    <div class="col-sm-8">
                                        <input type="password" name="confirm" class="form-control" placeholder="Nhập lại mật khẩu">
                                        <?php echo form_error('confirm'); ?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputCaptcha" class="col-sm-4 control-label">Mã kiểm tra</label>
                                    <div class="col-sm-6">
                                        <p><?php echo $this->session->userdata('question'); ?></p>
                                        <input type="number" class="form-control" name="captcha" placeholder="Câu trả lời là chữ số">
                                        <?php echo form_error('captcha'); ?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-4 col-sm-8">
                                        <button type="submit" class="btn btn-danger">Đăng ký</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!--end .panel-->