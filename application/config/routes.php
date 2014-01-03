<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
/*
  | -------------------------------------------------------------------------
  | URI ROUTING
  | -------------------------------------------------------------------------
  | This file lets you re-map URI requests to specific controller functions.
  |
  | Typically there is a one-to-one relationship between a URL string
  | and its corresponding controller class/method. The segments in a
  | URL normally follow this pattern:
  |
  |	example.com/class/method/id/
  |
  | In some instances, however, you may want to remap this relationship
  | so that a different class/function is called than the one
  | corresponding to the URL.
  |
  | Please see the user guide for complete details:
  |
  |	http://codeigniter.com/user_guide/general/routing.html
  |
  | -------------------------------------------------------------------------
  | RESERVED ROUTES
  | -------------------------------------------------------------------------
  |
  | There area two reserved routes:
  |
  |	$route['default_controller'] = 'welcome';
  |
  | This route indicates which controller class should be loaded if the
  | URI contains no data. In the above example, the "welcome" class
  | would be loaded.
  |
  |	$route['404_override'] = 'errors/page_missing';
  |
  | This route will tell the Router what URI segments to use if those provided
  | in the URL cannot be matched to a valid route.
  |
 */

//Backend
$route['nevergiveup'] = "nevergiveup/index";
$route['background/(:any)'] = "background/$1";
$route['background/(:any)/(:any)'] = "background/$1/$2";

//Frontend

// Videos
$route['watch/(:any)'] = "video/watch/$1";
$route['upload/(:num)'] = "video/upload/$1";
$route['upload'] = "video/upload";
$route['uploaded'] = "video/uploaded";
$route['delete'] = "video/delete";
$route['video/ajax_load_more'] = "video/ajax_load_more";
$route['video/report'] = "video/report";
$route['videonew'] = "video/news/1";
$route['videonew/(:num)'] = "video/news/$1";

// Account
$route['account'] = "account/index";
$route['account/(:any)'] = "account/$1";

$route['category/(:any)'] = "category/index/$1";
$route['category/(:any)/(:num)'] = "category/index/$1/$2";
$route['default_controller'] = "index";


//Chanel
$route['chanel/register_chanel'] = "chanel/ajax_register_chanel";
$route['chanel/unregister_chanel'] = "chanel/ajax_unregister_chanel";
$route['chanel/(:any)'] = "video/chanel/$1";

// Playlist
$route['playlist/add'] = "playlist/ajax_add_playlist";
$route['videoplaylist/add'] = "videoplaylist/add";


//Page
$route['about'] = "page/about/gioi-thieu";
$route['event/(:any)'] = "page/event/$1";

//News
$route['news'] = "news/index/1";
$route['news/page'] = "news/index/1";
$route['news/page/(:num)'] = "news/index/$1";
$route['news/(:any)(:num)'] = "news/detail/$2";

//Sitemap
$route['seo/(:any)'] = "seo/$1";

//Search
$route['result/video/(:any)'] = "search/video/$1";
//Error
$route['404_override'] = '';
/* End of file routes.php */
/* Location: ./application/config/routes.php */
