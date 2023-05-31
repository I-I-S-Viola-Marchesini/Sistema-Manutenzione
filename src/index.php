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
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js" integrity="sha256-WCzAhd2P6gRJF9Hv3oOOd+hFJi/QJbv+Azn4CGB8gfY=" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
    <title>Sistema Manutenzione</title>
</head>

<body style="max-width: 100vw;">

    <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3 pt-5">
        <div id="sessionRefreshSuccess" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body text-light">
                    <p class="m-0">Accesso effettuato con successo</p>
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>




    <div class="modal" id="sessionExpiredModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-light">Sessione scaduta</h1>
                </div>
                <div class="modal-body">
                    <p class="text-dark text-center">
                        Questa sessione è scaduta, per favore conferma l'accesso per continuare ad utilizzare il portale.
                    </p>
                    <div class="d-flex justify-content-center align-items-center">
                        <h4><a style="cursor: pointer;" data-target="login" login-popup-id="sessionExpiredModal_btn" class="btn btn-primary m-3">Accedi nuovamente</a></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid">
        <div class="row sticky-top blurrable" id="header">
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
            <div class="col-12 p-0 blurrable" style="min-height: 70vh;" id="contents">
            </div>
        </div>
        <div class="row blurrable" id="footer">
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
        require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/sessionManager.js';
        require_once $_SERVER['DOCUMENT_ROOT'] . '/scripts/pageSwitcher.js';
        ?>
    </script>
    <script src="https://js.hcaptcha.com/1/api.js?hl=it" async defer></script>
    <script>
        function render_hCaptcha(elementId, execute) {
            hcaptcha.render(elementId, {
                sitekey: '7bc9ed94-9b8f-4fb5-9888-2b899b5e2bb1',
                theme: 'light',
            });
            if (execute) hcaptcha.execute();
        }
    </script>
</body>

</html>