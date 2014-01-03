<div class="col-lg-8 col-md-8 col-sm-8 list-video">
    <div class="panel panel-default">
        <div class="panel-heading hidden-xs">
            <h3 class="panel-title">
                <i class="glyphicon glyphicon-play-circle"></i>
                Xem
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-lg-12">
                    <h2 class="title-panel-body"><?php echo $video->title; ?></h2>
                    <ul class="list-unstyled list-inline metada-panel-body visible-lg visible-md">
                        <li><i class="glyphicon glyphicon-user"></i> <?php echo $video->nickname; ?></li>
                        <li><i class="glyphicon glyphicon-time"></i> <?php echo getConvetDate($video->post_date); ?></li>
                    </ul>
                    <div class="fb-like" data-href="<?php echo current_url(); ?>" data-layout="standard" data-action="like" data-show-faces="false" data-share="true"></div>
                    <img src="http://img.youtube.com/vi/<?php echo $video->video_id; ?>/hqdefault.jpg" alt="<?php echo $video->title; ?>" class="img-responsive hidden"/>
                    <div class="video-container">
                        <iframe frameborder="0" allowfullscreen="1" src="http://www.youtube.com/embed/<?php echo $video->video_id ?>?showinfo=0&amp;ps=docs&amp;autoplay=1&amp;iv_load_policy=3&amp;vq=large&amp;modestbranding=1&amp;nologo=1"></iframe>
                   </div>
                </div>
            </div>
            <div class="row info-video">
                <div class="col-xs-8 col-md-6">
                    <div class="row">
                        <div class="col-sm-2 col-lg-2 avatar hidden-xs hidden-sm">
                            <img src="<?php echo $video->avatar != '' ? site_url($video->avatar) : site_url('publics/account/avatar/default.jpg'); ?>" width="55" height="55" alt="<?php echo $video->username; ?>"/>
                        </div>
                        <div class="col-xs-9 col-sm-10 col-lg-9 metadata">
                            <div class="row">
                                <div class="col-lg-12">
                                    <ul class="list-unstyled list-inline">
                                        <li><a href="<?php echo site_url('chanel/' . $video->username); ?>"><strong><?php echo $video->nickname; ?></strong></a></li>
<!--                                        <li><span class="hidden-xs hidden-sm">·</span></li>
                                        <li><span class="hidden-xs hidden-sm">300 video</span></li>-->
                                    </ul>
                                    <div class="btn-group" id="register-chanel" data-chanel="<?php echo $video->userid; ?>">
                                        <?php
                                        if (!check_user_chanel($video->userid)):
                                            if (check_register_chanel($video->userid)):
                                                ?>
                                                <button class="btn btn-default btn-xs">Hủy đăng ký</button>
                                            <?php else: ?>
                                                <button class="btn btn-danger btn-xs <?php echo loggedin() ? '' : 'no-login' ?>">Đăng ký</button>
                                            <?php
                                            endif;
                                        endif;
                                        ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 col-md-6">
                    <div class="row">
                        <div class="col-lg-12 clearfix">
                            <div class="pull-right">
                                <strong class="total-view"><?php echo $video->total_view; ?></strong>
                                <!-- AddThis Button BEGIN -->
                                <div class="addthis_toolbox addthis_default_style addthis_16x16_style pull-right">
                                    <a class="addthis_button_facebook"></a>
                                    <a class="addthis_button_twitter"></a>
                                    <a class="addthis_button_google_plusone_share"></a>
                                </div>
                                <script type="text/javascript">
                                    var addthis_config = addthis_config || {};
                                    addthis_config.data_track_addressbar = false;
                                    addthis_config.data_track_clickback = false;
                                </script>
                                <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52108b8f544f33f1"></script>
                                <!-- AddThis Button END -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row description">
                <div class="col-lg-12">
                    <ul id="myTab" class="nav nav-tabs">
                        <li class="active"><a href="#description" data-toggle="tab">Giới thiệu</a></li>
                        <li class=""><a href="#playlist" data-toggle="tab">Thêm</a></li>
                        <li><a href="#report" data-toggle="tab">Báo cáo</a></li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <div class="tab-pane fade active in" id="description">
                            <p>
                                <strong>
                                    Đã xuất bản vào
                                    <span class="upload-date"><?php echo getConvetDate($video->post_date); ?></span>
                                </strong>
                            </p>
                            <div>
                                <?php echo $video->description; ?>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="playlist" data-id="<?php echo $video->id; ?>">
                            <?php if (loggedin()): ?>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p><strong>Thêm vào danh sách phát</strong></p>
                                        <div class="notice">
                                            
                                        </div>
                                    </div>
                                </div>
                            
                                <!-- <span class="created-at col-md-3 text-center visible-md visible-lg">10 tháng trước</span>
                                    <li class="playlist-item row">
                                                <a href="#">
                                                    <span class="playlist-title col-md-9">Xem sau</span>
                                                    <span class="playlist-public-private col-md-3 text-center visible-md visible-lg">Không công khai</span>
                                                </a>
                                            </li>
                                -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="playlist">
                                            <?php if(!empty($playlists)): ?>
                                                <?php foreach($playlists as $playlist): ?>
                                                    <li class="playlist-item row" data-id="<?php echo $playlist->id; ?>">
                                                        <a href="#">
                                                            <span class="playlist-title col-md-9"><?php echo $playlist->title; ?></span>
                                                            <span class="playlist-public-private col-md-3 text-center visible-md visible-lg"><?php echo status_permission($playlist->type); ?></span>
                                                        </a>
                                                    </li>
                                                <?php endforeach; ?>
                                            <?php else: ?>
                                                <span class="no-playlist">Bạn chưa có playlist nào!</span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 create-playlist">
                                        <div class="form-group nopadding col-sd-6 col-md-6">
                                            <input type="text" class="form-control" placeholder="Nhập tên danh sách phát mới">
                                        </div>
                                        <div class="form-group nopadding col-sd-3 col-md-3">
                                            <select class="form-control" name="permission">
                                                <option value="1">Công khai</option>
                                                <option value="2">Không công khai</option>
                                                <option value="3">Riêng tư</option>
                                            </select>
                                        </div>
                                        <div class="form-group nopadding col-sd-3 col-md-3">
                                            <button type="button" class="btn btn-primary" id="btnCreatePlaylist">Tạo danh sách</button>
                                        </div>
                                    </div>
                                </div>
                            <?php else:
                                ?>
                                <p class="text-center"><a href="<?php echo site_url('account/login?to=' . uri_string()); ?>" class="btn btn-danger">Đăng nhập</a></p>
                            <?php endif; ?>
                        </div>
                        <div class="tab-pane fade" id="report">
                            <?php if (loggedin()):
                                ?>
                                <div class="row">
                                    <div class="col-md-12 report">
                                        <h4>Vấn đề là gì?*</h4>
                                        <?php
                                        foreach ($reports as $key => $report):
                                            ?>
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="report" value="<?php echo $key; ?>"/>
                                                    <?php echo $report; ?>
                                                </label>
                                            </div>
                                            <?php
                                        endforeach;
                                        ?>
                                        <button class="btn btn-danger" id="btnReport" data-id="<?php echo $video->id; ?>">Gửi báo cáo</button>
                                    </div>
                                </div>
                            <?php else:
                                ?>
                                <p class="text-center"><a href="<?php echo site_url('account/login?to=' . uri_string()); ?>" class="btn btn-danger">Đăng nhập</a></p>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="fb-comments" data-href="<?php echo current_url(); ?>" data-numposts="5" data-width=""></div>
                </div>
            </div><!--end comment-->
        </div>
    </div><!--end .panel-->
</div>


