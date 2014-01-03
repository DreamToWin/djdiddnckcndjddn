<div class="col-lg-9 col-sm-8 list-video" data-total="<?php echo $total; ?>" data-page="1" data-per_page="<?php echo $per_page; ?>" data-account_id="<?php echo $account_id; ?>">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-sm-6">
                    <h3 class="panel-title">
                        <i class="glyphicon glyphicon-user"></i>
                        <?php echo $title; ?>
                    </h3>
                </div>
                <div class="col-sm-6 text-right" id="register-chanel" data-chanel="<?php echo $account_id; ?>">
                    <?php
                    if (!check_user_chanel($account_id)):
                        if (check_register_chanel($account_id)):
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
        <div class="panel-body">
            <div class="row">
                <div class="col-md-12">
                    <ul class="list-unstyled list-inline no-decoration list-action-chanel">
                        <?php
                        if (check_user_chanel($account_id)):
                            ?>
                            <li>
                                <a class="active" href="<?php echo site_url('chanel/' . $this->session->userdata('username')); ?>"><i class="glyphicon glyphicon-home"></i>&nbsp;Trang chủ</a>
                            </li>
                            <li>
                                <a id="load-subscriptions" data-account_id="<?php echo $account_id; ?>">Kênh đăng ký</a>
                            </li>
                            <li><a id="load-playlist" data-account_id="<?php echo $account_id; ?>">Danh sách phát</a></li>
                        <?php else: ?>
                            <li>
                                <a href="<?php echo base_url('chanel/' . $this->uri->segment(2)); ?>" class="active"><i class="glyphicon glyphicon-home"></i> Trang chủ</a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </div>
                <hr>
            </div>
            <div class="row subscriptions" id="subscriptions">
                <div class="col-md-12 loading">
                    <p class="text-center"><img src="<?php echo site_url('publics/frontend/img/ajax-loader.gif'); ?>" alt="Đang tải" /> <strong>Đợi xíu nữa nhé. Sắp ra rồi! :P</strong></p>
                </div>
            </div>

           
            <div class="tab_videos">
                <div class="row" id="videos">
                    <?php
                    if (count($videos)):
                        foreach ($videos as $video):
                            ?>
                            <div class="col-lg-3 col-sm-6 item-video">
                                <a href="<?php echo site_url('watch/' . $video->slug); ?>" title="<?php echo $video->title; ?>"><img src="http://img.youtube.com/vi/<?php echo $video->video_id; ?>/mqdefault.jpg" alt="<?php echo $video->title; ?>" class="img-responsive"></a>
                                <div class="caption">
                                    <h2 class="title-video">
                                        <a href="<?php echo site_url('watch/' . $video->slug); ?>" title="<?php echo $video->title; ?>">
                                            <?php echo isset($video->title) ? $video->title : ''; ?>
                                        </a>
                                    </h2>
                                    <ul class="list-unstyled list-inline metadata">
                                        <li><i class="glyphicon glyphicon-facetime-video"></i>&nbsp;<?php echo $video->total_view; ?> lượt xem</li>
                                        <li><i class="glyphicon glyphicon-time"></i>&nbsp;<?php echo timeago($video->post_date); ?></li>
                                    </ul>
                                </div>
                            </div>
                            <?php
                        endforeach;
                    else:
                        ?>
                        <p class="empty text-center">Chưa có video nào.</p>
                    <?php endif; ?>
                </div>
                <?php if ($total > $per_page): ?>
                    <div class="row">
                        <div class="col-md-12 loading">
                            <p class="text-center"><img src="<?php echo site_url('publics/frontend/img/ajax-loader.gif'); ?>" alt="Đang tải" /> <strong>Đợi xíu nữa nhé. Sắp ra rồi! :P</strong></p>
                        </div>
                        <div class="col-md-12 text-center">
                            <button type="button" class="btn-danger btn" id="load-more">Tải thêm</button>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div><!--end .panel-->
</div>
