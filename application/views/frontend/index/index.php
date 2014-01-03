<div class="col-lg-9 col-md-8 col-sm-8 list-video index-page">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-fire"></i>
                <?php echo anchor('videonew/2', 'Video Mới') ?>
            </h3>
        </div>
        <div class="panel-body">
            <?php
                if (count($vnews) > 0):
            ?>
            <div class="row">
                <?php
                    foreach ($vnews as $vnew):
                        $thumb = "http://img.youtube.com/vi/{$vnew->video_id}/mqdefault.jpg";
                        ?>
                        <div class="col-lg-3 col-sm-6 item-video">
                            <a href="<?php echo site_url('watch/' . $vnew->slug); ?>" title="<?php echo the_content($vnew->title); ?>"><img src="<?php echo $thumb; ?>" alt="<?php echo the_content($vnew->title); ?>" class="img-responsive"/></a>
                            <div class="caption">
                                <h2 class="title-video"><a href="<?php echo site_url('watch/' . $vnew->slug); ?>" title="<?php echo the_content($vnew->title); ?>"><?php echo isset($vnew->title) ? the_content($vnew->title) : ''; ?></a></h2>
                                <ul class="list-unstyled list-inline metadata">
                                    <li><i class="glyphicon glyphicon-facetime-video"></i>&nbsp;<?php echo $vnew->total_view; ?> lượt xem</li>
                                    <li><i class="glyphicon glyphicon-time"></i>&nbsp;<?php echo timeago($vnew->post_date); ?></li>
                                </ul>
                            </div>
                        </div>
                        <?php
                    endforeach;
                ?>
            </div>
            <div class="row">
                <div class="col-sm-12 text-center btn-more">
                    <a href="<?php echo site_url('videonew/2'); ?>" class="btn btn-danger">Xem thêm còn nhiều lắm!</a>
                </div>
            </div>
            <?php
            else:
                ?>
            <div class="row">
                <div class="col-md-12">
                    <p class="empty">Chưa có video nào.</p>
                </div>
            </div>
            <?php endif; ?>
        </div><!--end .panel-body-->
    </div><!--end .panel-->
</div>