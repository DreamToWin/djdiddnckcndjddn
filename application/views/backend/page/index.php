<div class="span12">
    <div class="trash">
        <a href="<?php echo site_url('nevergiveup/page/trash'); ?>" class="btn btn btn-danger" title="Thùng rác"><i class="icon-trash"></i> Thùng rác</a>
    </div>
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-table"></i>
                Danh sách trang
            </h3>
        </div>
        <div class="box-content nopadding">
            <table class="table table-nomargin dataTable table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Slug</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (!empty($pages) && is_array($pages)):
                        $i = 0;
                        foreach ($pages as $page):
                            $i++;
                            ?>
                            <tr>
                                <td><?php echo $i; ?></td>
                                <td><?php echo anchor('nevergiveup/page/edit/' . $page->id, $page->title); ?></td>
                                <td><?php echo anchor('nevergiveup/page/edit/' . $page->id, $page->slug); ?></td>
                                <td class="actionShort">
                                    <?php echo btn_edit('nevergiveup/page/edit/' . $page->id); ?>
                                    <?php echo btn_delete('nevergiveup/page/delete/' . $page->id); ?>
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