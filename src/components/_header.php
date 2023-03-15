<nav class="navbar navbar-expand-lg bg-primary navbar-dark shadow">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Sistema Manutenzione</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" href="#offcanvas" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <?php
      include 'components/_menu.php';
      ?>
    </div>
  </div>
</nav>

<div class="offcanvas bg-primary-subtle offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasLabel">Sistema Manutenzione</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <?php
    include 'components/_menu.php';
    ?>
  </div>
</div>