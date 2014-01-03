<?php

class google_sitemap {

    var $header = "<\x3Fxml version=\"1.0\" encoding=\"UTF-8\"\x3F>\n\t<urlset xmlns=\"http://www.google.com/schemas/sitemap/0.9\">";
    var $charset = "UTF-8";
    var $footer = "\t</urlset>\n";
    var $items = array();

    function add_item($new_item) {
        //Make sure $new_item is an 'google_sitemap item' object
        if (!is_a($new_item, "google_sitemap_item")) {
            //Stop execution with an error message
            trigger_error("Can't add a non-google_sitemap_item object to the sitemap items array");
        }
        $this->items[] = $new_item;
    }

    function build($file_name = null) {
        $map = $this->header . "\n";

        foreach ($this->items as $item) {
            $item->loc = htmlentities($item->loc, ENT_QUOTES);
            $map .= "\t\t<url>\n\t\t\t<loc>$item->loc</loc>\n";

            // lastmod
            if (!empty($item->lastmod))
                $map .= "\t\t\t<lastmod>$item->lastmod</lastmod>\n";

            // changefreq
            if (!empty($item->changefreq))
                $map .= "\t\t\t<changefreq>$item->changefreq</changefreq>\n";

            // priority
            if (!empty($item->priority))
                $map .= "\t\t\t<priority>$item->priority</priority>\n";

            $map .= "\t\t</url>\n\n";
        }

        $map .= $this->footer . "\n";

        if (!is_null($file_name)) {
            $fh = fopen($file_name, 'w');
            fwrite($fh, $map);
            fclose($fh);
        } else {
            return $map;
        }
    }

}

class google_sitemap_item {
    function google_sitemap_item($loc, $lastmod = '', $changefreq = '', $priority = '') {
        $this->loc = $loc;
        $this->lastmod = $lastmod;
        $this->changefreq = $changefreq;
        $this->priority = $priority;
    }
}

?>
