
<?php
if (count($subcriptions)) :
    foreach ($subcriptions as $subcription):
        ?>
        <div class="col-lg-3 col-sm-6 item-post">
            <div class="channel-feed">
                <ul class="feed-list">
                    <li class="feed-item">
                        <div class="row">
                            <div class="col-sm-2 col-lg-2 avatar hidden-xs hidden-sm">
                                <img src="<?php echo $subcription->avatar != '' ? site_url($subcription->avatar) : site_url('publics/account/avatar/default.jpg'); ?>" width="55" height="55" alt="<?php echo $this->session->userdata('username'); ?>"/>
                            </div>
                            <div class="col-sm-6 col-lg-10">
                                <strong><?php echo $this->session->userdata('nickname'); ?></strong><span>đã đăng ký kênh</span>
                            </div>
                        </div>
                        <div class="row">
                            <a href="<?php echo site_url('chanel/' . $subcription->username); ?>"><?php echo $subcription->username; ?></a>
                            <div class="col-sm-6 text-right" id="register-chanel" data-chanel="<?php echo $subcription->id; ?>">
                                <?php
                                if (!check_user_chanel($subcription->id)):
                                    if (check_register_chanel($subcription->id)):
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
                    </li>
                </ul>
            </div>
        </div>
        <?php
    endforeach;
else:
    ?>
    <p class="text-center">Bạn chưa đăng ký kênh nào</p>
<?php endif; ?>
 