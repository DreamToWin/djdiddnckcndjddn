<?php

class Seo extends Frontend_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('google_sitemap');
    }

    function index() {
        try {
            $this->load->model('video_model');
            $list = $this->video_model->get();
            $sitemap = new google_sitemap; //Create a new Sitemap Object
            foreach ($list as $da) {
                $item = new google_sitemap_item(base_url() . "watch/" . $da->slug, date("Y-m-d"), 'weekly', '0.8'); //Create a new Item
                $sitemap->add_item($item); //Append the item to the sitemap object
            }
            $sitemap->build("./sitemap_video.xml"); //Build it...
            //Let's compress it to gz
            $data = implode("", file("./sitemap_video.xml"));
            $gzdata = gzencode($data, 9);
            $fp = fopen("./sitemap_video.xml.gz", "w");
            fwrite($fp, $gzdata);
            fclose($fp);
            //Let's Ping google
            $this->_pingGoogleSitemaps(base_url() . "/sitemap_video.xml.gz");
        } catch (Exception $ex) {
            $this->log->write_log($ex->getMessage() . ' ' . $ex->getLine());
        }
    }

    function category() {
        try {
            $this->load->library('google_sitemap');
            $this->load->model('category_model');
            $list = $this->category_model->get();
            $sitemap = new google_sitemap; //Create a new Sitemap Object
            foreach ($list as $da) {
                $item = new google_sitemap_item(base_url() . "category/" . $da->slug, date("Y-m-d"), 'weekly', '0.8'); //Create a new Item
                $sitemap->add_item($item); //Append the item to the sitemap object
            }
            $sitemap->build("./sitemap_category.xml"); //Build it...
            //Let's compress it to gz
            $data = implode("", file("./sitemap_category.xml"));
            $gzdata = gzencode($data, 9);
            $fp = fopen("./sitemap_category.xml.gz", "w");
            fwrite($fp, $gzdata);
            fclose($fp);
            //Let's Ping google
            $this->_pingGoogleSitemaps(base_url() . "/sitemap_category.xml.gz");
        } catch (Exception $ex) {
            $this->log->write_log($ex->getMessage() . ' ' . $ex->getLine());
        }
    }

    function _pingGoogleSitemaps($url_xml) {
        $status = 0;
        $google = 'www.google.com.vn';
        if ($fp = @fsockopen($google, 80)) {
            $req = 'GET /webmasters/sitemaps/ping?sitemap=' .
                    urlencode($url_xml) . " HTTP/1.1\r\n" .
                    "Host: $google\r\n" .
                    "User-Agent: Mozilla/5.0 (compatible; " .
                    PHP_OS . ") PHP/" . PHP_VERSION . "\r\n" . "Connection: Close\r\n\r\n";
            fwrite($fp, $req);
            while (!feof($fp)) {
                if (@preg_match('~^HTTP/\d\.\d (\d+)~i', fgets($fp, 128), $m)) {
                    $status = intval($m[1]);
                    break;
                }
            }
            fclose($fp);
        }
        return( $status );
    }

}

?>
