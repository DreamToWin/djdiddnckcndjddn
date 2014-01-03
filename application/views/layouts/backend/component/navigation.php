<div id="main">
    <div class="container-fluid">
        <div class="page-header">
            <div class="pull-left">
                <h1><?php echo isset($page) ? $page : 'Dashboard' ?></h1>
            </div>
            <div class="pull-right">
                <ul class="minitiles">
                    <li class='teal'>
                        <a href="#"><i class="icon-inbox"></i></a>
                    </li>
                    <li class='red'>
                        <a href="#"><i class="icon-cogs"></i></a>
                    </li>
                    <li class='lime'>
                        <a href="#"><i class="icon-globe"></i></a>
                    </li>
                </ul>
                <ul class="stats">
                    <li class='blue'>
                        <i class="icon-shopping-cart"></i>
                        <div class="details">
                            <span class="big">175</span>
                            <span>New orders</span>
                        </div>
                    </li>
                    <li class='green'>
                        <i class="icon-money"></i>
                        <div class="details">
                            <span class="big">$324,12</span>
                            <span>Balance</span>
                        </div>
                    </li>
                    <li class='orange'>
                        <i class="icon-calendar"></i>
                        <div class="details">
                            <span class="big">February 22, 2013</span>
                            <span>Wednesday, 13:56</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="breadcrumbs">
            <?php echo isset($breadcrum) ? $breadcrum : site_url('nevergiveup'); ?>
            <div class="close-bread">
                <a href="#"><i class="icon-remove"></i></a>
            </div>
        </div>
        <div class="row-fluid">
                