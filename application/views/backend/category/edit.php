<div class="span12">
    <div class="box box-bordered box-color">
        <div class="box-title">
            <h3><i class="icon-th-list"></i> <?php echo empty($category->id) ? "Thêm chuyên mục mới" : 'Sửa chuyên mục'; ?></h3>
        </div>
        <div class="box-content nopadding">
            <form method="POST" class="form-horizontal form-bordered">
                <div class="control-group">
                    <label for="textfield" class="control-label">Tên chuyên mục</label>
                    <div class="controls">
                        <input type="text" name="name" id="name" value="<?php echo set_value('name', $category->name); ?>">
                        <?php echo form_error('name'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label for="password" class="control-label">Cha</label>
                    <div class="controls">
                        <select name="parent_id">
                            <option value="0">Chuyên mục gốc</option>
                            <?php echo $select; ?>
                        </select>
                    </div>
                </div>
                <div class="control-group">
                    <label for="textarea" class="control-label" class="input-xxlarge">Từ khóa</label>
                    <div class="controls">
                        <textarea name="keyword" class="xxlarge"><?php echo set_value('keyword', $category->keyword); ?></textarea>
                        <?php echo form_error('keyword'); ?>
                    </div>
                </div>                
                <div class="control-group">
                    <label for="textarea" class="control-label" class="input-xxlarge">Mô tả</label>
                    <div class="controls">
                        <textarea name="description" class="xxlarge"><?php echo set_value('description', $category->description); ?></textarea>
                        <?php echo form_error('description'); ?>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Lưu lại</button>
                </div>
            </form>
        </div>
    </div>
</div>