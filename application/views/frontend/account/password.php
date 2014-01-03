<div class="col-sm-8 primary">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-list"></i>
                Thay đổi mật khẩu
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-12">
                    <?php echo isset($message) ? $message : $this->session->flashdata('message');?>
                    <p class="help-block">Ngoài cách đăng nhập vào 123Xem.Vn bằng tài khoản Facebook, bạn có thể đặt mật khẩu để đăng nhập bằng email và mật khẩu trong trường hợp không vào được Facebook hoặc mất tài khoản Facebook. </p>
                    <form class="form-horizontal" role="form" method="POST">
                        <?php if($this->session->userdata('old') === TRUE): ?>
                        <div class="form-group">
                            <label for="inputPasswordOld" class="col-sm-3 control-label">Mật khẩu cũ</label>
                            <div class="col-sm-6">
                                <input type="password" name="old" class="form-control">
                                <?php echo form_error('old'); ?>
                            </div>
                        </div>
                        <?php endif; ?>
                        <div class="form-group">
                            <label for="inputPassword" class="col-sm-3 control-label">Mật khẩu mới</label>
                            <div class="col-sm-6">
                                <input type="password" name="new" class="form-control">
                                <input type="hidden" name="id" class="form-control" value="<?php echo $id; ?>">
                                <?php echo form_error('new'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputConfirm" class="col-sm-3 control-label">Nhập lại</label>
                            <div class="col-sm-6">
                                <input type="password" name="confirm" class="form-control">
                                <?php echo form_error('confirm'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-8">
                                <button type="submit" class="btn btn-danger">Thay đổi</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div><!--end category-->
</div>