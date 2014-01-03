<div class="box box-bordered box-color">
    <div class="box-title">
        <h3><i class="icon-user-md"></i> <?php echo empty($account->id) ? "Thêm tài khoản" : 'Cập nhập tài khoản'; ?></h3>
    </div>
    <div class="box-content nopadding">
        <form method="POST" class="form-horizontal form-bordered" enctype="multipart/form-data">
            <?php if (empty($account->id)): ?>
                <div class="control-group">
                    <label for="username" class="control-label">Tài khoản</label>
                    <div class="controls">
                        <input type="<?php echo empty($account->id) ? 'text' : 'hidden'; ?>" name="username" value="<?php echo set_value('username', $account->username); ?>" class="input-large" placeholder="Nhập tài khoản"  >
                        <?php echo form_error('username'); ?>
                    </div>
                </div>
            <?php endif; ?>
            <?php if (empty($account->id)): ?>
                <div class="control-group">
                    <label for="password" class="control-label">Mật khẩu</label>
                    <div class="controls">
                        <input type="password" name="password" value="" class="input-large" placeholder="********"/>
                        <?php echo form_error('password'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label for="password" class="control-label">Nhập lại mật khẩu</label>
                    <div class="controls">
                        <input type="password" name="confirmpassword" value="" class="input-large" placeholder="********"/>
                        <?php echo form_error('confirmpassword'); ?>
                    </div>
                </div>
            <?php endif; ?>
            <div class="control-group">
                <label for="email" class="control-label">Địa chỉ email</label>
                <div class="controls">
                    <input type="text" name="email" value="<?php echo set_value('email', $account->email); ?>" class="input-large" placeholder="Nhập địa chỉ email">
                    <?php echo form_error('email'); ?>
                </div>
            </div>

            <div class="control-group">
                <label for="fullname" class="control-label">Họ tên</label>
                <div class="controls">
                    <input type="text" name="fullname" value="<?php echo set_value('fullname', $account->fullname); ?>" class="input-large" placeholder="Nhập họ tên">
                    <?php echo form_error('fullname'); ?>
                </div>
            </div>
            <div class="control-group">
                <label for="birthday" class="control-label">Nhập ngày sinh</label>
                <div class="controls">
                    <input type="text" name="birthday" value="<?php echo set_value('birthday', $account->birthday); ?>" class="input-large" placeholder="Nhập ngày sinh">
                    <?php echo form_error('birthday'); ?>
                </div>
            </div>

            <div class="control-group">
                <label for="sex" class="control-label">Chọn giới tính</label>
                <div class="controls">
                    <?php
                    echo form_dropdown('sex', $sex_list, $account->sex)
                    ?>
                </div>
            </div>

            <div class="control-group">
                <label for="phone" class="control-label">Số điện thoại</label>
                <div class="controls">
                    <input type="text" name="phone" value="<?php echo set_value('phone', $account->phone); ?>" class="input-large" placeholder="Nhập số điện thoại">
                    <?php echo form_error('phone'); ?>
                </div>
            </div>

            <div class="control-group">
                <label for="address" class="control-label">Địa chỉ</label>
                <div class="controls">
                    <input type="text" name="address" value="<?php echo set_value('address', $account->address); ?>" class="input-xxlarge" placeholder="Nhập địa chỉ công ty">
                    <?php echo form_error('address'); ?>
                </div>
            </div>

            <div class="control-group">
                <label class="control-label" for="textfield">Avatar</label>
                <div class="controls">
                    <div data-provides="fileupload" class="fileupload fileupload-new"><input type="hidden">
                        <span class="btn btn-file"><span class="fileupload-new">Avatar</span><span class="fileupload-exists">Thay đổi</span><input type="file" name="avatar"></span>
                        <span class="fileupload-preview"></span>
                        <a style="float: none" data-dismiss="fileupload" class="close fileupload-exists" href="#">×</a>
                    </div>
                </div>
            </div>

            <div class="control-group">
                <label for="type" class="control-label">Quyền</label>
                <div class="controls">
                    <?php
                    echo form_dropdown('type', $type_list, $account->type)
                    ?>
                </div>
            </div>
            <div class="control-group">
                <label for="status" class="control-label">Trạng thái</label>
                <div class="controls">
                    <?php
                    echo form_dropdown('status', $status_list, $account->status);
                    ?>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Lưu tài khoản</button>
            </div>
        </form>
    </div>
</div>