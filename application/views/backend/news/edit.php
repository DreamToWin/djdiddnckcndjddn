<div class="span12">
    <div class="box box-bordered box-color">
        <div class="box-title">
            <h3><i class="icon-th-list"></i> <?php echo empty($news->id) ? "Thêm tin mới" : 'Sửa tin'; ?></h3>
        </div>
        <div class="box-content nopadding">
            <form method="POST" class="form-horizontal form-bordered" enctype="multipart/form-data">
                <div class="control-group">
                    <label for="title" class="control-label">Tiêu đề</label>
                    <div class="controls">
                        <input type="text" name="title" class="input-xxlarge" value="<?php echo set_value('title', $news->title); ?>"/>
                        <?php echo form_error('title'); ?>
                    </div>
                </div>

                <div class="control-group">
                    <label for="title" class="control-label">Mô tả</label>
                    <div class="controls">
                        <textarea name="summary" class="input-xxlarge"><?php echo set_value('summary', $news->summary); ?></textarea>
                        <?php echo form_error('summary'); ?>
                    </div>
                </div>



                <div class="control-group">
                    <label for="title" class="control-label">[SEO] Tiêu Đề</label>
                    <div class="controls">
                        <input type="text" name="meta_title" class="input-xxlarge" value="<?php echo set_value('meta_title', $news->meta_title); ?>"/>
                        <?php echo form_error('meta_title'); ?>
                    </div>
                </div>


                <div class="control-group">
                    <label for="title" class="control-label">[SEO] Mô tả</label>
                    <div class="controls">
                        <textarea name="meta_description" class="input-xxlarge"><?php echo set_value('meta_description', $news->meta_description); ?></textarea>
                        <?php echo form_error('meta_description'); ?>
                    </div>
                </div>

                <div class="control-group">
                    <label for="title" class="control-label">[SEO] Từ khóa</label>
                    <div class="controls">
                        <textarea name="meta_keyword" class="input-xxlarge"><?php echo set_value('meta_keyword', $news->meta_keyword); ?></textarea>
                        <?php echo form_error('meta_keyword'); ?>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="file">Ảnh minh họa</label>
                    <div class="controls">
                        <input type="file" class="input-block-level" name="thumbnail">
                    </div>
                </div>


                <div class="control-group">
                    <label for="content" class="control-label">Nội dung</label>
                    <div class="controls">
                        <textarea name="content" rows="5" class="xxlarge ckeditor"><?php echo set_value('content', $news->content); ?></textarea>
                        <?php echo form_error('content'); ?>
                    </div>
                </div>

                <div class="control-group">
                    <label for="status" class="control-label">Trạng thái</label>
                    <div class="controls">
                        <?php echo form_dropdown('status', $status, $news->status) ?>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Lưu tin</button>
                </div>
            </form>
        </div>
    </div>
</div>
