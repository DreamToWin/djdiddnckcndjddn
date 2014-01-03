<div class="span12">
    <div class="trash">
        <a href="<?php echo site_url('nevergiveup/category/trash'); ?>" class="btn btn btn-danger" title="Thùng rác"><i class="icon-trash"></i> Thùng rác</a>
        <a href="<?php echo site_url('nevergiveup/category/sort'); ?>" class="btn btn-primary" title="Sắp xếp"><i class="icon-reorder"></i> Sắp xếp menu</a>
    </div>
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-table"></i>
                Danh sách chuyên mục
            </h3>
        </div>
        <div class="box-content nopadding">
            <table class="table table-nomargin dataTable table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Slug</th>
                        <th>Cấp độ</th>
                        <th>Từ khóa</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (!empty($categories) && is_array($categories)):
                        $i = 0;
                        foreach ($categories as $category):
                            $i++;
                            ?>
                            <tr>
                                <td><?php echo $i; ?></td>
                                <td><?php echo anchor('nevergiveup/category/edit/' . $category->id, $category->name); ?></td>
                                <td><?php echo anchor('nevergiveup/category/edit/' . $category->id, $category->slug); ?></td>
                                <td><?php echo $category->parent_name; ?></td>
                                <td><?php echo $category->keyword; ?></td>
                                <td class="actionShort">
                                    <?php echo btn_edit('nevergiveup/category/edit/' . $category->id); ?>
                                    <?php echo btn_delete('nevergiveup/category/delete/' . $category->id); ?>
                                </td>
                            </tr>
                            <?php
                        endforeach;
                    endif;
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>