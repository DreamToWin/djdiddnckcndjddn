<div class="col-sm-9">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-bullhorn"></i>
                Tin mới
            </h3>
        </div>
        <div class="panel-body news">
            <?php
            if (count($news)):
                foreach ($news as $new):
                $url = 'news/'.  toSlug($new->title) . '-i' .$new->id;
            ?>
                    <div class="row">
                        <div class="col-sm-3">
                            <a href="<?php echo site_url($url); ?>" class="thumbnail"><img src="<?php echo site_url($new->thumbnail); ?>"  alt=""/></a>
                        </div>
                        <div class="col-sm-9">
                            <h2><a href="<?php echo site_url($url); ?>"><?php echo $new->title; ?></a></h2>
                            <ul class="metadata list-unstyled list-inline">
                                <li>
                                    <i class="glyphicon glyphicon-calendar"></i> <?php echo convertToDatetime($new->post_date, 'd/m/Y H:i:s'); ?>
                                </li>
                                <li>
                                    <i class="glyphicon glyphicon-eye-open"></i> <?php echo $new->views; ?>
                                </li>
                            </ul>
                            <p class="summary">
                                <?php echo $new->summary; ?>
                            </p>
                        </div>
                    </div>
            <?php
                endforeach;
            endif;
            ?>
            <div class="text-center no-margin">
                <?php echo $pagination; ?>
            </div>
        </div>
    </div><!--end .panel-->
</div><!--end .primary-->
