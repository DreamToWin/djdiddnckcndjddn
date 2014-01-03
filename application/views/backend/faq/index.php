<div class="span12">
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-comments-alt"></i>
                FAQ 123xem.com
            </h3>
        </div>
        <div class="box-content nopadding">
            <form method="POST" class="form-horizontal form-bordered" action="<?php echo site_url('nevergiveup/faq/save'); ?>">
                <div class="control-group">
                    <label for="textfield" class="control-label">Tiêu đề</label>
                    <div class="controls">
                        <input type="text" name="title" class="xxlarge" value="<?php echo $faq->title; ?>" id="title">
                    </div>
                </div>
                <div class="control-group">
                    <label for="content" class="control-label">Nội dung</label>
                    <div class="controls">
                        <textarea name="content" rows="15" class="xxlarge tinymce"><?php echo $faq->content; ?></textarea>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Lưu lại</button>
                </div>
            </form>
        </div>
    </div>
</div>
