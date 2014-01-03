<div class="box box-bordered box-color">
    <div class="box-title">
        <h3><i class="icon-th-list"></i> Danh sách tài khoản</h3>
    </div>
    <div class="box-content nopadding">
        <table class="table table-nomargin dataTable table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th class="hidden-350">Họ tên</th>
                    <th class="hidden-480">Email</th>
                    <th class="hidden-480">Giới tính</th>
                    <th>Trạng thái</th>
                    <th class="hidden-1024">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if (count($accounts)) : $i = 0;
                    foreach ($accounts as $account):
                        $i++;
                        ?>
                        <tr>
                            <td><?php echo $i; ?></td>
                            <td><?php echo anchor('nevergiveup/account/edit/' . $account->id, $account->fullname); ?></td>
                            <td class="hidden-1024"><?php echo $account->email; ?></td>
                            <td class="hidden-350"><?php echo sex($account->sex ); ?></td>
                            <td class="hidden-350"><?php echo status_account($account->status); ?></td>
                            <td class="actionShort">
        <?php echo btn_edit('nevergiveup/account/edit/' . $account->id); ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
<?php else : ?>
                    <tr>
                        <td colspan="7">Chưa có bản ghi nào</td>
                    </tr>
<?php endif; ?>
            </tbody>
        </table>
    </div>
</div>