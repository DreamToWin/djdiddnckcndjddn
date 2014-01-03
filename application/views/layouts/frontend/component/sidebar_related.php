<div class="col-lg-4 col-md-4 col-sm-4 sidebar">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-list"></i>
                Có thể bạn thích
            </h3>
        </div>
        <div class="panel-body video-category">
            <?php foreach ($related as $relate): ?>
                <div class="row item">
                    <div class="col-xs-4 col-lg-4 thumb">
                        <a href="<?php echo site_url('watch/' . $relate->slug); ?>">
                            <img alt="<?php echo $relate->title; ?>" class="img-responsive" src="http://i1.ytimg.com/vi/<?php echo $relate->video_id; ?>/default.jpg"/>
                        </a>
                    </div>
                    <div class="col-xs-8 col-lg-8 metadata">
                        <h2><a href="<?php echo site_url('watch/' . $relate->slug); ?>" title="<?php echo $relate->title; ?>"><?php echo $relate->title; ?></a></h2>
                        <p class="by">của <strong><?php echo $relate->nickname; ?></strong></p>
                        <p class="view-count"><?php echo $relate->total_view; ?> lượt xem</p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div><!--end category-->
</div>