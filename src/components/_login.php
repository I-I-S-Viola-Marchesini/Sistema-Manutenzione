<div class="container mt-5 border rounded shutdown-sm">
    <div class="row">
        <div class="col-lg-6 p-4 col-12">
            <div class="row">
                <h1 class="text-center">Accedi</h1>
            </div>
            <div class="row">
                <div class="alert d-none" role="alert" id="login_message">
                </div>
                <form>
                    <div class="mb-3">
                        <label for="login_form_username" class="form-label">Indirizzo Email</label>
                        <input type="email" id="login_form_email" class="form-control" data-toggle="login_form_email_popover" data-bs-trigger="focus" title="Popover Header" data-content="Some content inside the popover">
                        <div class="list-group login-email-autocomplete rounded-top-0 bg-dark" id="login_form_autocomplete_list">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="login_form_password" class="form-label">Password</label>
                        <input type="password" id="login_form_password" class="form-control">
                    </div>
                    <div class="d-flex justify-content-between">
                        <a id="forgot_password_button" class="btn btn-link">Password dimenticata</a>
                        <button id="login_button" class="btn btn-primary">Accedi</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-6 p-0 d-lg-block d-none custom__login-background-image">
            <div class="h-100 p-4" style="background-color: rgba(0, 0, 0, 0.6); ">
                <div class="row text-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
                    </svg>
                </div>
                <div class="row">
                    <h1 class="text-center text-light">Sistema Manutenzione</h1>
                </div>
                <div class="row">
                    <p class="text-center text-light">
                        Sistema Manutenzione è il software più completo per il controllo e la gestione delle operazioni di manutenzione, che permette di controllare ogni processo, dalle scadenze, i controlli di routine, fino alle riparazioni e sistemazioni.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .custom__login-background-image {
        background-image: url('/images/facciata_itis_viola.png');
        background-size: cover;
        background-position: center;
    }
</style>