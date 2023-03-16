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
    <title>Sistema Manutenzione</title>
</head>

<body class="">
    <div class="container-fluid">
        <div class="row sticky-top">
            <?php
                require_once __DIR__ . '/components/_header.php';
            ?>
        </div>
        <div class="row">
            <div class="col-12">
                <?php
                    require_once __DIR__ . '/components/_editorTest.php';
                ?>
            </div>
        </div>
    </div>
    <script>
        <?php
            require_once __DIR__ . '/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js'
        ?>
    </script>
</body>

</html>