<div class="span12">
    <div class="box">
        <div class="box-content">
            <h6>Thống kê video vi phạm</h6>
            <a href="" class="badge badge-info" title="Video vi phạm"><?php echo count($videos) ? count($videos) : '0'; ?> Vi phạm</a>
         </div>
        <div class="message">
            <?php echo isset($message) ? $message : $this->session->flashdata('message'); ?>
        </div>
    </div>
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3>
                <i class="icon-table"></i>
                Danh sách video vi phạm
            </h3>
        </div>
        <div class="box-content nopadding">
            <table class="table table-nomargin dataTable table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên video</th>
                        <th>Link video</th>
                        <th>Ngày đăng</th>
                        <th>Báo vi phạm</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (!empty($videos) && is_array($videos)):
                        $i = 0;
                        foreach ($videos as $video):
                            $i++;
                            ?>
                            <tr>
                                <td><?php echo $i; ?></td>
                                <td><?php echo $video->title; ?></td>
                                <td>
                                    <a href="#myModal<?php echo $video->id; ?>" data-toggle="modal"><?php echo $video->link; ?></a>
                                </td>
                                <td><?php echo getConvertDatetime($video->post_date); ?></td>
                                <td style="color: red; text-align: center;"><?php echo $video->violation; ?> lượt</td>
                                <td><?php echo video_status($video->status); ?></td>
                                <td>
                                    <?php echo btn_detail('nevergiveup/video/detail/'.$video->id);?>
                                    <?php if ($video->violation >= 10) : ?>
                                        <?php echo btn_delete('nevergiveup/video/delete/'.$video->id);?>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <div id="myModal<?php echo $video->id; ?>" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 class="text-center" id="myModalLabel"><?php echo $video->title; ?></h4>
                                <div class="modal-body">
                                    <iframe width="500" height="360" src="//www.youtube.com/embed/<?php echo parse_yturl($video->link); ?>" frameborder="0" allowfullscreen>
                                    </iframe>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="btn">Close</a>
                                    <a href="<?php echo site_url('nevergive/video/delete/') ?>" class="btn btn-danger">Xóa video</a>
                                </div>
                            </div>
                        </div>
                        <?php
                    endforeach;
                endif;
                ?>
                </tbody>
            </table>

            <script type="text/javascript">
                $('#myModal').modal({
                    keyboard: false,
                    show: false
                });
            </script>
        </div>
    </div>
</div>
