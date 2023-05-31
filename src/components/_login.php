<link rel="stylesheet" href="styles/pages/login.css">

<div id="auth_error_modal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Impossibile continuare</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>
                    Controlla di aver inserito correttamente, username o indirizzo email e password.<br>
                    Se hai dimenticato la password, resettala.
                    <br><br>
                    Se il problema persiste, contatta l'amministratore di sistema.
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Riprova</button>
            </div>
        </div>
    </div>
</div>

<div id="api_error_modal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Errore Interno</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>
                    C'è stato un errore di comunicazione con il server e non è stato possibile completare l'operazione.<br>
                    <br><br>
                    Se il problema persiste, contatta l'amministratore di sistema.
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Riprova</button>
            </div>
        </div>
    </div>
</div>

<div id="reset_password_use_email" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Reset Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>
                    <b>La password non può essere resettata usando un nome utente.</b><br>
                    <br><br>
                    Inserisci l'indirizzo email associato al tuo account e riprova.
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Chiudi</button>
            </div>
        </div>
    </div>
</div>

<div id="reset_password_captcha" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Reset Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>
                    Completa la verifica e clicca sul pulsante "Invia" per ricevere un link per resettare la password.<br>
                </p>
                <span id="captcha_container" class="d-flex justify-content-center"></span>
                <p id="captcha_container_error" class="text-danger d-none">
                    <br>
                    Completa la verifica per continuare
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="reset_password_captcha_submit">Invia</button>
            </div>
        </div>
    </div>
</div>

<div class="w-100" style="height: 100vh;">
    <div class="row h-100 p-0 m-0">
        <div class="col-12 p-3 d-flex flex-column justify-content-center align-items-center" style="background-color: rgba(125, 63, 248, 0.500);">
            <div class="align-items-center mb-3">
                <div class="row text-light m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
                    </svg>
                </div>
                <div class="row m-2">
                    <h2 class="text-center text-light">Sistema Manutenzione</h2>
                </div>
            </div>
            <div id="login_box" class="p-5 mb-3 container shadow-lg bg-white rounded">
                <div class="row">
                    <h1 class="text-center" id="login_box_h1">Accedi</h1>
                </div>
                <div class="row mb-3">
                    <p class="text-center" id="login_box_text"></p>
                </div>
                <div id="form_container">
                    <div id="saved_accounts">
                        <div class="list-group list-group-flush h-100">
                            <button type="button" class="list-group-item list-group-item-action">
                                <div class="row">
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <img src="images/propic-placeholder.jpg" class="rounded-circle" style="width: 40px;" alt="" srcset="">
                                    </div>
                                    <div class="col-10">
                                        <p class="mb-0">Alex Niccolò Ferrari</p>
                                        <small class="text-muted">@alexniccolo.ferrari</small>
                                    </div>
                                </div>
                            </button>
                            <button type="button" class="list-group-item list-group-item-action">
                                <div class="row">
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <img src="images/propic-placeholder.jpg" class="rounded-circle" style="width: 40px;" alt="" srcset="">
                                    </div>
                                    <div class="col-10">
                                        <p class="mb-0">Alex Niccolò Ferrari</p>
                                        <small class="text-muted" style="font-size: 0.7rem;">alex65ferrari@gmail.com</small>
                                    </div>
                                </div>
                            </button>
                            <button type="button" class="list-group-item list-group-item-action">
                                <div class="row">
                                    <div class="col-2 d-flex justify-content-center align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                    </div>
                                    <div class="col-10">
                                        <p class="mb-0">Usa un altro account</p>
                                        <small class="text-muted">Accedi con username e password</small>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div id="username_input">
                        <div class="form-floating mb-5">
                            <input type="email" class="form-control" tabindex="-1" id="login_form_email" placeholder="">
                            <label for="login_form_email">Indirizzo Email o Nome Utente</label>
                        </div>
                        <p id="login_form_email_error" class="text-danger d-none">Questo non è un username o indirizzo email valido</p>
                    </div>

                    <div id="password_input">
                        <div class="form-floating mb-5">
                            <input type="password" class="form-control" tabindex="-1" id="login_form_password" placeholder="">
                            <label for="login_form_email">Password</label>
                        </div>
                        <p id="login_form_password_error" class="text-danger d-none">Questa non è una password valida</p>
                        <div class="row mb-3">
                            <a id="init_reset_password" class="link-primary" tabindex="-1" style="cursor: pointer;">
                                Resetta la password
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <div id="controls_container" class="container shadow-lg bg-white rounded">

                <div class="row m-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <a id="controls_back" class="link-primary" style="cursor: pointer;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                            <span id="controls_back_text"></span>
                        </a>
                        <button id="controls_next" class="btn btn-primary">Accedi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

