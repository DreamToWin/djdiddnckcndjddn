<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>API</title>
    </head>
    <body>
        <ul>
            <li><a href="<?php echo site_url('api/generation/categories'); ?>">Get Category</a></li>
            <li><a href="<?php echo site_url('api/generation/video/slug/hai-huoc/limit/12'); ?>">Get video by category</a></li>
            <li><a id="ajax" href="<?php echo site_url('api/generation/categories'); ?>">categories</a></li>
        </ul>
        <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function() {
                // Bind a click event to the 'ajax' object id
                $("#ajax").bind("click", function(evt) {
                    // Javascript needs totake over. So stop the browser from redirecting the page
                    evt.preventDefault();
                    // AJAX request to get the data
                    $.ajax({
                        // URL from the link that was clicked on
                        url: $(this).attr("href"),
                        alter($(this).attr("href"));
                        // Success function. the 'data' parameter is an array of objects that can be looped over
                        success: function(data, textStatus, jqXHR) {
                            alert('Successful AJAX request!');
                        },
                        // Failed to load request. This could be caused by any number of problems like server issues, bad links, etc.
                        error: function(jqXHR, textStatus, errorThrown) {
                            alert('Oh no! A problem with the AJAX request!');
                        }
                    });
                });
            });
        </script>
    </body>
</html>