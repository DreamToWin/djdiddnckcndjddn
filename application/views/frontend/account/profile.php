<div class="col-sm-8 primary">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-list"></i>
                Thông tin cá nhân
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-12">
                    <?php echo isset($message) ? $message : $this->session->flashdata('message'); ?>
                    <form class="form-horizontal" role="form" method="POST">
                        <div class="form-group">
                            <label for="inputUsername" class="col-sm-3 control-label">Tên hiển thị</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="nickname" value="<?php echo set_value('nickname', $account->nickname); ?>" placeholder="Từ 6 đến 50 kí tự">
                                <input type="hidden" value="<?php echo $id; ?>" name="id"/>
                                <?php echo form_error('nickname'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputUsername" class="col-sm-3 control-label">Họ tên</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="fullname" value="<?php echo set_value('fullname', $account->fullname); ?>">
                                <?php echo form_error('fullname'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputBirthday" class="col-sm-3 control-label">Ngày sinh</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" value="<?php echo set_value('birthday', $account->birthday); ?>" name="birthday" id="datepicker">
                                <?php echo form_error('birthday'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputSex" class="col-sm-3 control-label">Giới tính</label>
                            <div class="col-sm-6">
                                <div class="radio-inline">
                                    <label>
                                        <input type="radio" <?php echo set_radio('sex', $account->sex, TRUE); ?> value="1" name="sex">
                                        Nam
                                    </label>
                                </div>
                                <div class="radio-inline">
                                    <label>
                                        <input type="radio" <?php echo set_radio('sex', $account->sex, FALSE); ?>  value="0" name="sex">
                                        Nữ
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputPhone" class="col-sm-3 control-label">Điện thoại</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="phone" value="<?php echo set_value('phone', $account->phone); ?>">
                                <?php echo form_error('phone'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress" class="col-sm-3 control-label">Địa chỉ</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" rows="3"name="address"><?php echo set_value('address', $account->address); ?></textarea>
                                <?php echo form_error('address'); ?>
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