<div class="col-sm-9">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-bullhorn"></i>
                Sự kiện diễn ra
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="fb-like" data-href="<?php echo current_url(); ?>" data-layout="standard" data-action="like" data-show-faces="false" data-share="true"></div>
                    <?php echo $event->content;?>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="fb-comments" data-href="<?php echo current_url(); ?>" data-numposts="5" data-width=""></div>
                </div>
            </div><!--end comment-->
        </div>
    </div><!--end .panel-->
</div><!--end .primary-->
