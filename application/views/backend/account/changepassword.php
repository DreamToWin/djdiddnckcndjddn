<div class="box box-bordered box-color">
    <div class="box-title">
        <h3><i class="icon-user-md"></i>Đổi mật khẩu</h3>
    </div>
    <div class="box-content nopadding">
        <form method="POST" class="form-horizontal form-bordered">
            <div class="control-group">
                <label for="password" class="control-label">Mật khẩu cũ</label>
                <div class="controls">
                    <input type="password" name="passwordold" value="" class="input-large" placeholder="********"/>
                    <?php echo form_error('password'); ?>
                </div>
            </div>
            <div class="control-group">
                <label for="password" class="control-label">Mật khẩu mới</label>
                <div class="controls">
                    <input type="password" name="passwordnew" value="" class="input-large" placeholder="********"/>
                    <?php echo form_error('passwordnew'); ?>
                </div>
            </div>
            <div class="control-group">
                <label for="password" class="control-label">Nhập lại mật khẩu</label>
                <div class="controls">
                    <input type="password" name="confirm" value="" class="input-large" placeholder="********"/>
                    <?php echo form_error('confirm'); ?>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Đổi mật khẩu</button>
            </div>
        </form>
    </div>
</div>