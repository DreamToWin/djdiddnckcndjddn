<div class="span12">
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-table"></i>
                Danh sách thùng giác
            </h3>
        </div>
        <div class="box-content nopadding">
            <table class="table table-nomargin dataTable table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Slug</th>
                        <th>Vị trí</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (!empty($trashs) && is_array($trashs)):
                        $i = 0;
                        foreach ($trashs as $trash):
                            $i++;
                            ?>
                            <tr>
                                <td><?php echo $i; ?></td>
                                <td><?php echo anchor('nevergiveup/menu/recovery/' . $trash->id, $trash->name); ?></td>
                                <td><?php echo $trash->slug; ?></td>
                                <td><?php echo get_position($trash->position); ?></td>
                                <td><?php echo status_menu($trash->status); ?></td>
                                <td class="actionShort">
                                    <?php echo btn_edit('nevergiveup/menu/recovery/' . $trash->id); ?>
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