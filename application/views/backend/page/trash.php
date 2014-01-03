<div class="span12">
    <div class="trash">
        <a href="<?php echo site_url('nevergiveup/page'); ?>" class="btn btn-primary" title="Page"><i class="icon-trash"></i> Danh sách</a>
    </div>
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-table"></i>
                Danh sách thùng rác
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
                                <td><?php echo anchor('nevergiveup/page/recoverd/' . $page->id, $page->title); ?></td>
                                <td><?php echo anchor('nevergiveup/page/recoverd/' . $page->id, $page->slug); ?></td>
                                <td class="actionShort">
                                    <?php echo btn_edit('nevergiveup/page/recoverd/' . $page->id); ?>
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