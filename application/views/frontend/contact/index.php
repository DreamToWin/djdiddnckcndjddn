<div class="col-sm-8">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-user"></i>
                Liên hệ với chúng tôi
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-12">
                    <?php echo isset($message) ? $message : $this->session->flashdata('message');?>
                    <form class="form-horizontal" role="form" method="post">
                        <div class="form-group">
                            <label for="inputName" class="col-sm-3 control-label">Tên của bạn</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="name" value="<?php echo set_value('name'); ?>">
                                <?php echo form_error('name'); ?>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputEmail" class="col-sm-3 control-label">Email</label>
                            <div class="col-sm-6">
                                <input type="email" class="form-control" name="email" value="<?php echo set_value('email'); ?>">
                                <?php echo form_error('email'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputTitle" class="col-sm-3 control-label">Tiêu đề</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="title" value="<?php echo set_value('title'); ?>">
                                <?php echo form_error('title'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputContent" class="col-sm-3 control-label">Nội dung</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" rows="3"name="content"><?php echo set_value('content'); ?></textarea>
                                <?php echo form_error('content'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputCaptcha" class="col-sm-3 control-label">Mã kiểm tra</label>
                            <div class="col-sm-6">
                                <p><?php echo $this->session->userdata('question'); ?></p>
                                <input type="number" class="form-control col-sm-9" name="captcha" placeholder="Câu trả lời là số">
                                <?php echo form_error('captcha'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-9">
                                <button type="submit" class="btn btn-danger">Gửi đi</button>
                                <button type="reset" class="btn btn-default">Xóa</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div><!--end .panel-->
</div><!--end .primary-->
