<div class="span12">
    <div class="trash">
        <div class="btn-group">
            <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-envelope"></i> Hộp thư <span class="caret"></span></a>
            <ul class="dropdown-menu dropdown-primary">
                <li>
                    <a href="<?php echo site_url('nevergiveup/contact/inbox/1'); ?>" title="Tin mới"><i class="icon-comments"></i> Tin mới</a>
                </li>
                <li>
                    <a href="<?php echo site_url('nevergiveup/contact/inbox/2'); ?>"  title="Đã xem"><i class="icon-envelope"></i> Chưa trả lời</a>
                </li>
                <li>
                    <a href="<?php echo site_url('nevergiveup/contact/inbox/3'); ?>"  title="Đã trả lời"><i class="icon-reply"></i> Đã trả lời</a>
                </li>
                <li class="divider"></li>
                <li>
                    <a href="<?php echo site_url('nevergiveup/contact/inbox/4'); ?>"  title="Đã trả lời"><i class="icon-trash"></i> Thùng rác</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="box">
        <div class="box-title">
            <h3>
                <i class="icon-comments"></i>
                Thông tin phản hồi
            </h3>
            <div class="actions">
                <a class="btn btn-mini content-refresh" href="#"><i class="icon-refresh"></i></a>
                <a class="btn btn-mini content-remove" href="#"><i class="icon-remove"></i></a>
                <a class="btn btn-mini content-slideUp" href="#"><i class="icon-angle-down"></i></a>
            </div>
        </div>
        <div class="box-content nopadding" style="display: block;">
            <?php echo isset($message) ? $message : $this->session->flashdata('message'); ?>
            <ul class="messages">
                <li class="left">
                    <div class="image">
                        <img alt="" src="<?php echo site_url('publics/backend/img/demo/user-2.jpg'); ?>"/>
                    </div>
                    <div class="message">
                        <span class="caret"></span>
                        <span class="name"><?php echo $contact->name; ?></span>
                        <br/>
                        <span class="name"><?php echo $contact->title; ?></span>
                        <p><?php echo $contact->content; ?></p>
                        <span class="time">
                            <i class="icon-calendar"></i> <?php echo getConvertDatetime($contact->contact_date); ?>
                        </span>
                        <?php if (empty($reply)) : ?>
                            <span class="reply">
                                <i class="icon-reply"></i> <a id="reply" class="btn-link">Trả lời</a>
                            </span>
                        <?php endif; ?>
                    </div>
                </li>
                <?php
                if (!empty($reply) && is_array($reply)):
                    foreach ($reply as $rep):
                        ?>
                        <li class="right">
                            <div class="image">
                                <img alt="" src="<?php echo site_url('publics/backend/img/demo/user-2.jpg'); ?>"/>
                            </div>
                            <div class="message">
                                <span class="caret"></span>
                                <span class="name"><?php echo $rep->fullname; ?></span>
                                <br/>
                                <span class="name"><?php echo $rep->title; ?></span>
                                <p><?php echo $rep->content; ?></p>
                                <span class="time">
                                    <i class="icon-calendar"></i> <?php echo getConvertDatetime($rep->reply_date); ?>
                                </span>
                            </div>
                        </li>
                    <?php endforeach; ?>
                <?php else : ?>
                    <li class="send" style="display: none;">
                        <form action="<?php echo site_url('nevergiveup/contact/reply_message'); ?>" method="POST">
                            <input type="hidden" value="<?php echo $contact->id; ?>" name="id" id="id"/>
                            <textarea name="content" rows="5" class="xxlarge tinymce"></textarea>
                            <?php echo form_error('content'); ?>
                            <br/>
                            <input type="submit" value="Trả lời" class="btn btn-primary"/> 
                        </form>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
    </div>
</div>
<script src="<?php echo site_url('publics/backend/js/plugins/tinymce/tinymce.min.js') ?>"></script>
<script src="<?php echo site_url('publics/backend/js/plugins/tinymce/config.js') ?>"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $("#reply").click(function() {
            $(".send").slideToggle("slow");
        });
    });
</script>
