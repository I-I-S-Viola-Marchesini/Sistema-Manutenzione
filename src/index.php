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
    <script src="/vendor/tinymce/tinymce/tinymce.min.js"></script>
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
            <div class="position-fixed w-100 h-100 bg-dark d-flex justify-content-center align-items-center" style="--bs-bg-opacity: .4;" id="spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
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
    <script src="https://js.hcaptcha.com/1/api.js?hl=it" async defer></script>
    <script>
        function render_hCaptcha(elementId, execute) {
            hcaptcha.render(elementId, {
                sitekey: '7bc9ed94-9b8f-4fb5-9888-2b899b5e2bb1',
                theme: 'light',
            });
            if(execute) hcaptcha.execute();
        }
    </script>
</body>

</html>