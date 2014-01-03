<div id="my-player">

                    </div>
<script src="<?php echo site_url('publics/frontend/js/plugins/jwplayer/jwplayer.js'); ?>"></script>
                    <script type="text/javascript">
                        jwplayer("my-player").setup({
                            file: 'https://www.youtube.com/watch?v=<?php echo $video->video_id ?>',
                            image: 'http://img.youtube.com/vi/<?php echo $video->video_id; ?>/mqdefault.jpg',
                            aspectratio: '16:9',
                            autoPlay: true,
                            autoStart: true,
                            controlbar: 'none',
                            width: '100%',
                            'flashplayer': '<?php echo site_url('publics/frontend/js/plugins/jwplayer/jwplayer.flash.swf'); ?>'
                        });
                    </script>