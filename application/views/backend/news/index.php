<div class="span12">
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-table"></i>
                Danh sách tin tức
            </h3>
        </div>
        <div class="box-content nopadding">
            <table class="table table-nomargin dataTable table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (!empty($news) && is_array($news)):
                        $i = 0;
                        foreach ($news as $new):
                            $i++;
                            ?>
                            <tr>
                                <td><?php echo $i; ?></td>
                                <td><?php echo anchor('nevergiveup/news/edit/' . $new->id, $new->title); ?></td>
                                <td class="actionShort">
                                    <?php echo btn_edit('nevergiveup/news/edit/' . $new->id); ?>
                                    <?php echo btn_delete('nevergiveup/news/delete/' . $new->id); ?>
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