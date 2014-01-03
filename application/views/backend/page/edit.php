<div class="span12">
    <div class="box box-bordered box-color">
        <div class="box-title">
            <h3><i class="icon-th-list"></i> <?php echo empty($pages->id) ? "Thêm chuyên trang" : 'Sửa trang'; ?></h3>
        </div>
        <div class="box-content nopadding">
            <form method="POST" class="form-horizontal form-bordered" >
                <div class="control-group">
                    <label for="title" class="control-label">Tiêu đề</label>
                    <div class="controls">
                        <input type="text" name="title" class="input-xxlarge" value="<?php echo set_value('title', $pages->title); ?>"/>
                        <?php echo form_error('title'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label for="content" class="control-label">Nội dung</label>
                    <div class="controls">
                        <textarea name="content" rows="5" id="editor" class="xxlarge"><?php echo set_value('content', $pages->content); ?></textarea>
                        <?php echo form_error('content'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label for="comment" class="control-label">Kích hoạt comment</label>
                    <div class="controls">
                        <?php echo form_dropdown('comment', $comment, $pages->comment) ?>
                    </div>
                </div>
                <div class="control-group">
                    <label for="status" class="control-label">Trạng thái</label>
                    <div class="controls">
                        <?php echo form_dropdown('status', $status, $pages->status) ?>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Lưu tin</button>
                </div>
            </form>
        </div>
    </div>
</div>
