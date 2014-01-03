<?php
if (count($videos)):
    foreach ($videos as $video):
        ?>
        <div class="col-lg-3 col-sm-6 item-video">
            <a href="<?php echo site_url('watch/' . $video->slug); ?>" title="<?php echo the_content($video->title); ?>">
                <img src="http://img.youtube.com/vi/<?php echo $video->video_id; ?>/mqdefault.jpg" alt="<?php echo the_content($video->title); ?>" class="img-responsive">
            </a>
            <div class="caption">
                <h2 class="title-video">
                    <a href="<?php echo site_url('watch/' . $video->slug); ?>" title="<?php echo the_content($video->title); ?>">
                        <?php echo isset($video->title) ? the_content($video->title) : ''; ?>
                    </a>
                </h2>
                <ul class="list-unstyled list-inline metadata">
                    <li><i class="glyphicon glyphicon-facetime-video"></i>&nbsp;<?php echo $video->total_view; ?> lượt xem</li>
                    <li><i class="glyphicon glyphicon-time"></i>&nbsp;<?php echo timeago($video->post_date); ?></li>
                </ul>
            </div>
        </div>
        <?php
    endforeach;
else:
    ?>
<?php endif; ?>