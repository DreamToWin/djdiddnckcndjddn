function convertToSlug(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
}

function redirectSearch(baseURL, key) {
    if (key.length < 4 || key.length > 50) {
        bootbox.alert('Từ khóa phải từ 4 đến 50 kí tự');
        return false;
    } else {
        var keyword = convertToSlug(key);
        var url = baseURL + 'result/video/' + keyword;
        window.location.href = encodeURI(url);
    }
}

function add_playlist(play_name, play_id, per_name, per_id) {
    var text = '<li class="playlist-item row" data-id=' + play_id + '><a href="#"><span class="playlist-title col-md-9">' + play_name + '</span>';
    text += '<span class="playlist-public-private col-md-3 text-center visible-md visible-lg">' + per_name + '</span></a></li>';
    return text;
}
function message(message, type) {
    var text = '<div class="alert alert-' + type + ' fade in"><button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>';
    text += message + '</div>';
    return text;
}

function add_playlist_video(base, playlist_id, video_id) {
    $.post(base + 'videoplaylist/add', {playlist_id: playlist_id, video_id: video_id}, function(data) {
        if (data === 'success') {
            $('.notice').html(message('Bạn đã thêm video thành công vào playlist', 'success'));
        } else if (data === 'exists') {
            $('.notice').html(message('Video này đã tồn tại trong playlist', 'danger'));
        } else {
            $('.notice').html(message('Có lỗi xảy ra bạn vui lòng quay lại sau.', 'danger'));
        }
    });
}
$(function() {
    var baseURL = $('#baseURL').attr('href');
    //Datetime picker
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'mm/dd/yy'
    },
    $.datepicker.regional[ "vi" ]);
    //Check delete action
    $('.checkDelete').on('click', function() {
        if (!confirm('Bạn có chắc chắn muốn xóa không?')) {
            return false;
        }
    });

    // load more
    $('#load-more').on('click', function() {
        var page = $('.list-video').data('page');
        var per_page = $('.list-video').data('per_page');
        var total = $('.list-video').data('total');
        var account_id = $('.list-video').data('account_id');

        if (per_page * page <= total) {
            $('.loading').show();
            $.post(baseURL + 'video/ajax_load_more', {page: page + 1, per_page: per_page, account_id: account_id}, function(data) {
                $('.list-video').data('page', page + 1);
                if (per_page * (page + 1) >= total) {
                    $('#load-more').hide();
                }
                setTimeout(function() {
                    $('#videos').append(data);
                }, 1000);

            }).done(function() {
                setTimeout(function() {
                    $('.loading').hide();
                }, 1000);
            });
        } else {
            $(this).hide();
        }
    });

    // load view
    $('#load-subscriptions').on('click', function() {
        var account_id = $('.list-video').data('account_id');
        $('.loading').show();
        $(this).addClass('active');
        $('.list-action-chanel li a').first().removeClass('active');
        $('.tab_videos').css("display", "none");
        $.post(baseURL + 'video/ajax_load_subscription', {account_id: account_id}, function(data) {
            setTimeout(function() {
                $('.subscriptions').append(data);
            }, 1000);
        }).done(function() {
            setTimeout(function() {
                $('.loading').hide();
            }, 1000);
        });
    });

    // load video subscription
    $('.load-video-playlist').on('click', function() {
        var playlist_id = $(this).data('playlist_id');
        $('.loading').show();
        $('#playlist').css("display", "none");
        $.post(baseURL + 'playlist/ajax_load_video_subcription', {playlist_id: playlist_id}, function(data) {
            setTimeout(function() {
                $('#videoplaylist').append(data);
            }, 1000);
        }).done(function() {
            setTimeout(function() {
                $('.loading').hide();
            }, 1000);
        });
    });

//    $('#load-playlist').on('click', function() {
//        $('.loading').show();
//        $.post(baseURL + 'video/ajax_load_video_playlist',function(data) {
//            setTimeout(function() {
//                $('#videoplaylists').append(data);
//            }, 1000);
//        }).done(function() {
//            setTimeout(function() {
//                $('.loading').hide();
//            }, 1000);
//        });
//    });

    // LOAD VIDEOS API
    $('.load-video-api').on('click', function() {
        var slug = $(this).data('slug');
        var limit = $(this).data('limit');
        $('.apivideos').css("display", "none");
        $.post(baseURL + 'genapi/ajax_load_video_api', {slug: slug, limit: limit}, function(data) {
            setTimeout(function() {
                $('#videosapi').append(data);
            }, 1000);
        });
    });


    /* Register Chanel */
    $('.no-login').on('click', function() {
        bootbox.alert({
            message: 'Xin lỗi bạn phải đăng nhập để sử dụng chức năng này'
        });
    });
    $('#register-chanel').on('click', function() {
        var button = $(this).children('button');
        var logined = button.hasClass('no-login');
        if (!logined) {
            var registed = button.hasClass('btn-danger');
            var chanel = $(this).data('chanel');
            if (registed) {
                $.post(baseURL + 'chanel/register_chanel', {chanel: chanel}, function(result) {
                    if (result === 'success') {
                        button.removeClass('btn-danger').addClass('btn-default');
                        button.text('Hủy đăng ký');
                        bootbox.alert('Chúc mừng! Bạn đã đăng ký thành công kênh này.');
                    } else if (result === 'registed') {
                        bootbox.alert('Có lỗi! Bạn đã đăng ký kênh này rồi.');
                    } else {
                        bootbox.alert('Có lỗi xảy ra bạn vui lòng thử lại sau.');
                    }
                });
            } else {
                $.post(baseURL + 'chanel/unregister_chanel', {chanel: chanel}, function(result) {
                    if (result === 'success') {
                        button.removeClass('btn-default').addClass('btn-danger');
                        button.text('Đăng ký');
                        bootbox.alert('Chúc mừng! Bạn đã hủy đăng ký kênh này thành công.');
                    } else {
                        bootbox.alert('Có lỗi xảy ra bạn vui lòng thử lại sau.');
                    }
                });
            }
        }
    });

    /* Report Video*/
    $('#btnReport').on('click', function() {
        var video = $(this).data('id');
        var report = +$("input:radio[name=report]:checked").val();
        if (isNaN(report)) {
            bootbox.alert('Bạn phải chọn vấn đề vi phạm của video này.');
        } else {
            $.post(baseURL + 'video/report', {video_id: video, type: report}, function(result) {
                if (result === 'reported') {
                    bootbox.alert('Bạn đã báo lỗi của video này rồi!');
                } else if (result === 'success') {
                    bootbox.alert('Cám ơn bạn đã gửi báo cáo cho chúng tôi.');
                } else {
                    bootbox.alert('Có lỗi xảy ra. Bạn vui lòng thử lại sau.');
                }
            });
        }
    });

    /* Create playlist*/
    $('#btnCreatePlaylist').on('click', function() {
        var playlist = $(this).parent().parent('.create-playlist');
        var input = playlist.find('input[type=text]');
        var name = input.val();
        var permission = playlist.find('select').find(':selected');
        var permission_name = permission.text();
        var permission_id = permission.val();
        if (name.length <= 150 && name.length >= 3) {
            $.post(baseURL + 'playlist/add', {title: name, type: permission_id}, function(data) {
                if (!isNaN(data) && parseInt(data) > 0) {
                    $('.playlist').find('.no-playlist').remove();
                    var video_id = $('#playlist').data('id');
                    add_playlist_video(baseURL, data, video_id);
                    $('.playlist').append(add_playlist(name, data, permission_name, permission_id));
                } else if (data === 'exists') {
                    $('.notice').html(message('Tên playlist này đã tồn tại.', 'danger'));
                } else {
                    $('.notice').html(message('Có lỗi xảy ra bạn vui lòng quay lại sau.', 'danger'));
                }
            });
            input.val('');
        } else {
            $('.notice').html(message('Tên playlist phải lớn hơn 3 và nhỏ hơn 150 kí tự.', 'danger'));
        }
    });

    $('.playlist-item').on('click', function(e) {
        e.preventDefault();
        var playlist_id = $(this).data('id');
        var video_id = $('#playlist').data('id');
        add_playlist_video(baseURL, playlist_id, video_id);
    });


    //Search video
    $('#btnSearch').on('click', function() {
        var select = $('#srch-term');
        var keyword = select.val();
        redirectSearch(baseURL, keyword, select);
    });


    $('#srch-term').on('keypress', function(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            redirectSearch(baseURL, $(this).val());
        }
    });

});