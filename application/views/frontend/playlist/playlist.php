<div class="col-lg-9 col-sm-8 list-video">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-sm-6">
                    <h3 class="panel-title">
                        <i class="glyphicon glyphicon-user"></i>
                        Danh sách phát
                    </h3>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-unstyled list-inline no-decoration list-action-chanel">

                        <li>
                            <a class="active" href="<?php echo site_url('playlist')?>">Danh sách phát</a>
                        </li>
                    </ul>
                </div>
                <hr>
            </div>

            <div class="row" id="playlist">
                <ul class="videoplaylists">
                    <?php foreach ($playlists as $playlist) : ?>
                        <li>
                            <a class="load-video-playlist" data-playlist_id="<?php echo $playlist->id; ?>"><?php echo $playlist->title; ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="row videoplaylist" id="videoplaylist">
                <div class="col-md-12 loading">
                    <p class="text-center"><img src="<?php echo site_url('publics/frontend/img/ajax-loader.gif'); ?>" alt="Đang tải" /> <strong>Đợi xíu nữa nhé. Sắp ra rồi! :P</strong></p>
                </div>
            </div>
        </div>
    </div><!--end .panel-->
</div>
