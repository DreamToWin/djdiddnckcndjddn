<div class="col-sm-8 primary">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-list"></i>
                <?php echo $title = $video->id != '' ? 'Sửa Video' : 'Đăng Video' ?>
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-12">
                    <?php echo isset($message) ? $message : $this->session->flashdata('message'); ?>
                    <form class="form-horizontal" role="form" method="POST">
                        <div class="form-group">
                            <label for="" class="col-sm-3 control-label">Tiêu đề</label>
                            <div class="col-sm-9">
                                <input type="text" name="title" class="form-control" value="<?php echo set_value('title', $video->title); ?>">
                                <?php echo form_error('title'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-3 control-label">Link (Youtube)</label>
                            <div class="col-sm-9">
                                <input type="url" name="link" class="form-control" value="<?php echo set_value('link', $video->link); ?>">
                                <?php echo form_error('link'); ?>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="" class="col-sm-3 control-label">Chuyên mục</label>
                            <div class="col-sm-9">
                                <select name="category_id" class="form-control">
                                    <option value="">Chọn chuyên mục</option>
                                    <?php echo $select; ?>
                                </select>
                                <?php echo form_error('category_id'); ?>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="" class="col-sm-3 control-label">Mô tả</label>
                            <div class="col-sm-9">
                                <textarea name="description" class="form-control" id="tinymce"><?php echo set_value('description', $video->description); ?></textarea>
                                <?php echo form_error('description'); ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-8">
                                <button type="submit" class="btn btn-danger"><?php echo $title; ?></button>
                                <a href="<?php echo site_url('video/uploaded'); ?>" class="btn btn-info">Quay lại</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div><!--end category-->
</div>
<script>
    tinymce.init({
        selector: "textarea",
        statusbar: false,
        entity_encoding: 'raw'
    });
</script>