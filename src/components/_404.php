<?php
    header("HTTP/1.0 404 Not Found");
?>
<div class="container pt-4">
    <h1 class="text-center">Errore 404</h1>
    <p class="text-center">
        Pagina&nbsp;<code><?php echo $_COOKIE['page'] ?></code>&nbsp;non trovata
    </p>
</div>