
<div class="span12">
    <div class="trash">
        <a href="<?php echo site_url('nevergiveup/menu/trash');?>" class="btn btn btn-danger" title="Thùng rác"><i class="icon-trash"></i> Thùng rác</a>
        <a href="<?php echo site_url('nevergiveup/menu/sort');?>" class="btn btn-primary" title="Sắp xếp"><i class="icon-reorder"></i> Sắp xếp menu</a>
    </div>
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-table"></i>
                Danh sách menu
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
                    if (!empty($menus) && is_array($menus)):
                        $i = 0;
                        foreach ($menus as $menu):
                            $i++;
                            ?>
                            <tr>
                                <td><?php echo $i; ?></td>
                                <td><?php echo anchor('nevergiveup/menu/edit/' . $menu->id, $menu->name); ?></td>
                                <td><?php echo $menu->slug; ?></td>
                                <td><?php echo get_position($menu->position); ?></td>
                                <td><?php echo status_menu($menu->status); ?></td>
                                <td class="actionShort">
                                    <?php echo btn_edit('nevergiveup/menu/edit/' . $menu->id); ?>
                                    <?php echo btn_delete('nevergiveup/menu/delete/' . $menu->id); ?>
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