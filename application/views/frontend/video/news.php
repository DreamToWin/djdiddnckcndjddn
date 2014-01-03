<div class="col-md-9 col-sm-8 list-video">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-fire"></i>
                <?php echo isset($title) ? $title : 'Danh sách Video mới'; ?>
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <?php
                if (count($news) > 0) :
                    foreach ($news as $category):
                        ?>
                        <div class="col-md-3 col-sm-4 item-video">
                            <a href="<?php echo site_url('watch/' . $category->slug); ?>" title="<?php echo $category->title; ?>">
                                <img src="http://img.youtube.com/vi/<?php echo $category->video_id; ?>/mqdefault.jpg " alt="<?php echo $category->title; ?>" class="img-responsive">
                            </a>
                            <div class="caption">
                                <h2 class="title-video">
                                    <a href="<?php echo site_url('watch/' . $category->slug); ?>" title="<?php echo $category->title; ?>">
                                        <?php echo $category->title; ?>
                                    </a>
                                </h2>
                                <ul class="list-unstyled list-inline metadata">
                                    <li><i class="glyphicon glyphicon-facetime-video"></i>&nbsp;<?php echo $category->total_view; ?> lượt xem</li>
                                    <li><i class="glyphicon glyphicon-time"></i>&nbsp;<?php echo timeago($category->post_date); ?></li>
                                </ul>
                            </div>
                        </div>          
                        <?php
                    endforeach;
                else :
                    ?>
                <p class="text-center"><img alt="Đang tải" src="<?php echo site_url('publics/frontend/img/ajax-loader.gif'); ?>"> <strong>Chưa cập nhật video. Quay lại sau nhé! :P</strong></p>
                <?php endif; ?>
            </div>
            <div class="text-center no-margin">
                <?php echo $pagination; ?>
            </div>
        </div><!--end .panel-body-->
    </div><!--end .panel-->
</div>