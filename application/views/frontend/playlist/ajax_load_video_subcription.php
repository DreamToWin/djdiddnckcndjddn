<?php
if (count($vsubcriptions)):
    foreach ($vsubcriptions as $vsubcription):
        ?>
        <div class="col-lg-3 col-sm-6 item-video">
            <a href="<?php echo site_url('watch/' . $vsubcription->slug); ?>" title="<?php echo the_content($vsubcription->title); ?>">
                <img src="http://img.youtube.com/vi/<?php echo $vsubcription->video_id; ?>/mqdefault.jpg" alt="<?php echo the_content($vsubcription->title); ?>" class="img-responsive">
            </a>
            <div class="caption">
                <h2 class="title-video">
                    <a href="<?php echo site_url('watch/' . $vsubcription->slug); ?>" title="<?php echo the_content($vsubcription->title); ?>">
                        <?php echo isset($vsubcription->title) ? the_content($vsubcription->title) : ''; ?>
                    </a>
                </h2>
                <ul class="list-unstyled list-inline metadata">
                    <li><i class="glyphicon glyphicon-facetime-video"></i>&nbsp;<?php echo random_view(); ?> lượt xem</li>
                    <li><i class="glyphicon glyphicon-time"></i>&nbsp;<?php echo timeago($vsubcription->post_date); ?></li>
                </ul>
            </div>
        </div>
    <?php endforeach;
else: ?>
    <p class="empty text-center">Chưa có video nào.</p>
<?php endif; ?>