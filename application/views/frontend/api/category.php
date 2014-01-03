<div class="col-sm-8">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-user"></i>
                Category
            </h3>
        </div>
        <div class="panel-body">
            <div class="row apivideos" class="apivideos">
                <div class="col-sm-12">
                    <ul>
                        <?php
                        if (count($json)) :
                            foreach ($json as $js) :
                                ?>
                                <li><a class="load-video-api" data-slug="<?php echo $js['slug']; ?>" data-limit="5"><?php echo $js['name']; ?></a></li>
                            <?php endforeach;
                        else: ?>
                            <p class="empty text-center">Chưa có chuyên mục nào</p>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12" id="videosapi"></div>
            </div>
        </div>
    </div><!--end .panel-->
</div><!--end .primary-->