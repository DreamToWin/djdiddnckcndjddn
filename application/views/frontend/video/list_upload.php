<div class="col-sm-8 primary">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-list"></i>
                Video đã tải lên
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-12">
                    <?php if (count($videos)): ?>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="col-sm-1">#</th>
                                    <th>Tiêu đề</th>
                                    <th class="col-sm-2">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $i = 0;
                                foreach ($videos as $video):
                                    $i++;
                                    ?>
                                    <tr>
                                        <td><?php echo $i; ?></td>
                                        <td><?php echo anchor('watch/' . $video->slug, the_content($video->title), array('target'=>'_blank')); ?></td>
                                        <td>
                                            <?php echo btn_frontend_edit('upload/' . $video->id); ?>
                                            <?php echo btn_frontend_delete('video/delete/' . $video->id); ?>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <div class="text-center no-margin">
                            <?php echo $pagination; ?>
                        </div>
                    <?php else: ?>
                        <p class="text-center">
                            Bạn chưa upload video nào. Hãy <a href="<?php echo site_url('video/upload'); ?>">Click vào đây</a> để upload video
                        </p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div><!--end category-->
</div>