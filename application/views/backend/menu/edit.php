<div class="span12">
    <div class="box box-bordered box-color">
        <div class="box-title">
            <h3><i class="icon-th-list"></i> <?php echo empty($menu->id) ? "Thêm menu mới" : 'Cập nhập menu'; ?></h3>
        </div>
        <div class="box-content nopadding">
            <form method="POST" class="form-horizontal form-bordered">
                <div class="control-group">
                    <label for="textfield" class="control-label">Tên menu</label>
                    <div class="controls">
                        <input type="text" name="name" value="<?php echo set_value('name', $menu->name); ?>" id="title">
                        <?php echo form_error('name'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label for="parent_id" class="control-label">Cha</label>
                    <div class="controls">
                        <select name="parent_id">
                            <option value="0">Chuyên mục gốc</option>
                            <?php echo $select; ?>
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label for="position" class="control-label">Vị trí</label>
                    <div class="controls">
                        <?php
                        echo form_dropdown('position', $position, $menu->position)
                        ?>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Lưu lại</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!--<script src="<? echo site_url('publics/backend/js/jquery.slugify.js') ?>"></script>
<script type="text/javascript" charset="utf-8">
    $().ready(function() {
        $('.slug').slugify('#title');

        var pigLatin = function(str) {
            return str.replace(/(\w*)([aeiou]\w*)/g, "$2$1ay");
        }

//        $('#pig_latin').slugify('#title', {
//            slugFunc: function(str, originalFunc) {
//                return pigLatin(originalFunc(str));
//            }
//        }
//        );
    });
</script>-->