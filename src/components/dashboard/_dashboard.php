<link rel="stylesheet" href="styles/pages/dashboard.css">

<div class="container p-3">
    <div class="row">
        <?php
        include '_sidebar.php';
        ?>
        <div class="col-12 col-lg-9">
            <?php
            include '_tab_' . $_GET['tab'] . '.php';
            ?>
        </div>
    </div>
</div>