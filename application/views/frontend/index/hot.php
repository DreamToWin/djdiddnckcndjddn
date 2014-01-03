
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-bookmark"></i>
                <strong>Video HOT</strong>
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <?php
                if (count($vhots)) :
                    foreach ($vhots as $vhot):
                        $thumb = "http://img.youtube.com/vi/{$vhot->video_id}/mqdefault.jpg";
                        ?>
                        <div class="col-lg-3 col-sm-6 item-video">
                            <a href="<?php echo site_url('watch/' . $vhot->slug); ?>" title="<?php echo the_content($vhot->title); ?>"><img src="<?php echo $thumb; ?>" alt="<?php echo the_content($vhot->title); ?>" class="img-responsive"/></a>
                            <div class="caption">
                                <h2 class="title-video"><a href="<?php echo site_url('watch/' . $vhot->slug); ?>" title="<?php echo the_content($vhot->title); ?>"><?php echo isset($vhot->title) ? the_content($vhot->title) : ''; ?></a></h2>
                                <ul class="list-unstyled list-inline metadata">
                                    <li><i class="glyphicon glyphicon-facetime-video"></i>&nbsp;<?php echo $vhot->total_view; ?> lượt xem</li>
                                    <li><i class="glyphicon glyphicon-time"></i>&nbsp;<?php echo timeago($vhot->post_date); ?></li>
                                </ul>
                            </div>
                        </div>
                        <?php
                    endforeach;
                else :
                    ?>
                    <div class="col-md-12">
                        <p class="empty">Chưa có video nào.</p>
                    </div>
                <?php endif; ?>
            </div>
        </div><!--end .panel-body-->
    </div><!--end .panel-->