<div class="p-3 bg-body-tertiary rounded-3 shadow-sm" style="min-height: 70vh;">
    <h1>
        Sicurezza
    </h1>
    <h4 class="text-muted">
        Modifica password
    </h4>
    <br>

    <div id="password_container">

        <div class="bg-light rounded-3 shadow" id="confirm_account_collapse">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-6">
                    <p class="text-center">
                        Conferma la tua identità inserendo la tua password attuale.
                    </p>
                    <div class="mb-3">
                        <label for="dashboard_security_oldpassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="dashboard_security_oldpassword">
                    </div>
                    <div class="d-flex justify-content-end">
                        <a class="btn btn-primary" id="dashboard_security_confirm">Continua</a>
                    </div>
                </div>
            </div>
            <br><br>
        </div>

        <div class="row p-2" id="change_password_div">
            <div class="col-12 col-lg-6">
                <div class="mb-3">
                    <label for="dashboard_security_newpassword" class="form-label">Nuova password</label>
                    <input type="password" class="form-control" id="dashboard_security_newpassword" disabled>
                </div>
                <div class="mb-3">
                    <label for="dashboard_security_repeat_newpassword" class="form-label">Ripeti la Nuova password</label>
                    <input type="password" class="form-control" id="dashboard_security_repeat_newpassword" disabled>
                </div>
                <div class="mb-3">
                    <input type="checkbox" class="form-check-input" id="dashboard_security_show_password">
                    <label for="dashboard_security_show_password" class="form-check-label">Mostra password</label>
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary" id="dashboard_security_change">Cambia Password</button>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <ul class="list-group list-group-flush rounded-3 shadow-sm" id="password_requirements">
                    <li class="list-group-item">
                        <b>La tua password deve:</b>
                    </li>
                    <li class="list-group-item">
                        <span id="password_req_length"></span> &nbsp; essere di minimo 8 caratteri
                    </li>
                    <li class="list-group-item">
                        <span id="password_req_uppercase"></span> &nbsp; contenere almeno una lettera maiuscola
                    </li>
                    <li class="list-group-item">
                        <span id="password_req_lowercase"></span> &nbsp; contenere almeno una lettera minuscola
                    </li>
                    <li class="list-group-item">
                        <span id="password_req_number"></span> &nbsp; contenere almeno un numero
                    </li>
                    <li class="list-group-item">
                        <span id="password_req_special"></span> &nbsp; contenere almeno un carattere speciale
                    </li>
                    <li class="list-group-item">
                        <span id="password_req_sequence"></span> &nbsp; essere priva di sequenze ripetitive
                    </li>
                    <li class="list-group-item">
                        <span id="password_req_dictionary"></span> &nbsp; non contenere informazioni personali
                    </li>
                </ul>
            </div>
        </div>

    </div>
</div>