<div class="span12">
    <div class="box box-color box-bordered">
        <div class="box-title">
            <h3><i class="icon-play-circle"></i><?php echo $detail->title; ?></h3>
        </div>
        <div class="box-content nopadding">
            <p class="time">
                <span><i class="icon-calendar"></i> <?php echo getConvertDatetime($detail->post_date); ?></span>
            </p>
            <div class="player">
                <iframe width="640" height="480" src="//www.youtube.com/embed/<?php echo parse_yturl($detail->link); ?>" frameborder="0" allowfullscreen>
                </iframe>
            </div>
            <a href="<?php echo site_url('nevergiveup/video') ?>" class="btn btn-small btn-inverse"><i class="icon-circle-arrow-left"></i> Quay lại</a>
        </div>
    </div>
</div>
