<?php
$loader = require_once __DIR__ . '/vendor/autoload.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/styles/bootstrap/custom.css" rel="stylesheet">
    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
    <title>Sistema Manutenzione</title>
</head>

<body class="">
    <div class="container-fluid">
        <div class="row sticky-top" id="header">
            <?php
            require_once __DIR__ . '/components/_header.php';
            ?>
        </div>
        <div class="row">
            <div class="col-12" style="min-height: 70vh;" id="contents">
            </div>
        </div>
        <div class="row" id="footer">
            <?php
            require_once __DIR__ . '/components/_footer.php';
            ?>
        </div>
    </div>
    <script>
        <?php
        require_once __DIR__ . '/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js'
        ?>
    </script>
    <script>
        <?php
        require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/pageSwitcher.js'
        ?>
    </script>
</body>

</html>