<?php
if (count($vjsons)):
foreach ($vjsons as $vjson):
    ?>
    <div class="col-lg-3 col-sm-6 item-video">
        <a href="<?php echo site_url('watch/' . $vjson['slug']); ?>" title="<?php echo the_content($vjson['title']); ?>">
            <img src="http://img.youtube.com/vi/<?php echo $vjson['video_id']; ?>/mqdefault.jpg" alt="<?php echo the_content($vjson['title']); ?>" class="img-responsive">
        </a>
        <div class="caption">
            <h2 class="title-video">
                <a href="<?php echo site_url('watch/' . $vjson['slug']); ?>" title="<?php echo the_content($vjson['title']); ?>">
                    <?php echo isset($vjson['title']) ? the_content($vjson['title']) : ''; ?>
                </a>
            </h2>
            <ul class="list-unstyled list-inline metadata">
                <li><i class="glyphicon glyphicon-facetime-video"></i>&nbsp;<?php echo random_view(); ?> lượt xem</li>
                
            </ul>
        </div>
    </div>
    <?php
endforeach;
else:
?>
<p class="text-center">Chua co video nao</p>
<?php endif; ?>
