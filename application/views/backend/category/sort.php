<div class="span12">
    <h3>Sắp xếp menu</h3>
    <p class="alert alert-info">Kéo và thả để sắp xếp theo thứ tự, cấp độ bạn mong muốn. Sau đó ấn "Lưu lại" để hoàn thành</p>
    <div id="orderResult"></div>
    
    <input type="button" id="save" value="Lưu lại" class="btn btn-primary" />
</div>
<script src="<?php echo site_url('publics/backend/js/jquery.mjs.nestedSortable.js') ?>"></script>
<script type="text/javascript">
    var url = '<?php echo site_url('nevergiveup/category/order_ajax/'); ?>';
    $.get(url, function(data) {
        $('#orderResult').html(data);
    });

    $('#save').click(function() {
        oSortable = $('.sortable').nestedSortable('toArray');
        $('#orderResult').slideUp(function() {
            $.post(url, {sortable: oSortable}, function(data) {
                $('#orderResult').html(data);
                $('#orderResult').slideDown();
            });
        });
    });
</script>
