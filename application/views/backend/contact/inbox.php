<div class="span12">
    <div class="box">
        <div class="box-content">
            <div class="btn-group">
                <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-envelope"></i> Hộp thư <span class="caret"></span></a>
                <ul class="dropdown-menu dropdown-primary">
                    <li>
                        <a href="<?php echo site_url('nevergiveup/contact/inbox/1'); ?>" title="Tin mới"><i class="icon-comments"></i> Tin mới</a>
                    </li>
                    <li>
                        <a href="<?php echo site_url('nevergiveup/contact/inbox/2'); ?>"  title="Đã xem"><i class="icon-envelope"></i> Chưa trả lời</a>
                    </li>
                    <li>
                        <a href="<?php echo site_url('nevergiveup/contact/inbox/3'); ?>"  title="Sắp xếp"><i class="icon-reply"></i> Đã trả lời</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="<?php echo site_url('nevergiveup/contact/inbox/4'); ?>"  title="Đã trả lời"><i class="icon-trash"></i> Thùng rác</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-comments-alt"></i>
                <?php
                echo contact_status($status);
                ?>
            </h3>
        </div>
        <div class="box-content nopadding">
            <table class="table table-nomargin dataTable table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Tiêu đề</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (!empty($contents) && is_array($contents)):
                        $i = 0;
                        foreach ($contents as $content):
                            $i++;
                            ?>
                            <tr>
                                <td><?php echo $i; ?></td>
                                <td><?php echo anchor('nevergiveup/contact/message/' . $content->id, $content->name); ?></td>
                                <td><?php echo anchor('nevergiveup/contact/message/' . $content->id, $content->email); ?></td>
                                <td><?php echo anchor('nevergiveup/contact/message/' . $content->id, $content->title); ?></td>
                                <td><?php echo contact_status($content->status); ?></td>
                                <td class="actionShort">    
                                    <?php if ($content->status == 4) : ?>
                                        <?php echo btn_delete('nevergiveup/contact/remover/' . $content->id); ?>
                                        <?php echo btn_recover('nevergiveup/contact/recover/' . $content->id); ?>
                                    <?php else: ?>
                                        <?php echo btn_detail('nevergiveup/contact/message/' . $content->id); ?>
                                        <?php echo btn_delete('nevergiveup/contact/delete/' . $content->id); ?>
                                    <?php endif; ?>
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
