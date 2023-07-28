<div class="p-3 bg-body-tertiary rounded-3 shadow-sm" style="min-height: 70vh;">
    <h1>
        Anagrafica
    </h1>

    <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-muted">
            Dati personali
        </h4>
        <button class="btn btn-primary" id="dashboard_data_save">Modifica</button>
    </div>
    <br>

    <div class="row">
        <div class="col-12 col-lg-6">
            <div class="mb-3">
                <label for="dashboard_data_name" class="form-label">Nome e Cognome</label>
                <input type="text" class="form-control" id="dashboard_data_name" disabled>
                <div class="form-text text-end"><span id="dashboard_data_name_chars">0</span>/40</div>
            </div>
        </div>
        <div class="col-12 col-lg-6">
            <div class="mb-3">
                <label for="dashboard_data_username" class="form-label">Username</label>
                <input type="text" class="form-control" id="dashboard_data_username" disabled>
                <div class="form-text text-end"><span id="dashboard_data_username_chars">0</span>/40</div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 col-lg-8">
            <div class="mb-3">
                <label for="dashboard_data_email" class="form-label">Email</label>
                <input type="text" class="form-control" id="dashboard_data_email" disabled>
                <div class="form-text text-end"><span id="dashboard_data_email_chars">0</span>/100</div>
            </div>
        </div>
    </div>

    <h4 class="text-muted" anchor-id="editProPic">
        Foto profilo
    </h4>

    <div class="row">
        <div class="col-12 col-lg-5">
            <p>
                Scegli lo stile della foto personale:
            </p>
            <div class="d-flex flex-row">
                <div class="form-check">
                    <input class="form-check-input propic-radio-input" type="radio" name="flexRadioDefault" id="propic_avatar">
                    <label class="form-check-label" for="propic_avatar">
                        <img id="propic_avatar_img" src="https://ui-avatars.com/api/?format=svg&background=7d3ff8&color=FFF&name=Alex+Niccol%C3%B2+Ferrari" class="rounded-circle p-1 m-0" style="width: 120px; height: 120px; cursor: pointer;" alt="" srcset="">
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input propic-radio-input" type="radio" name="flexRadioDefault" id="propic_uploaded">
                    <label class="form-check-label" for="propic_uploaded">
                        <img id="propic_uploaded_img" src="images/propic-placeholder.jpg" class="rounded-circle p-1 m-0" style="width: 120px; height: 120px; cursor: pointer;" alt="" srcset="">
                    </label>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-6" id="propic_upload_div">
            <p>
                Carica una foto personalizzata:
            </p>
            <div class="mb-3">
                <input class="form-control" type="file" id="propic_upload" accept="image/jpg,image/jpeg,image/png,image/gif">
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" id="dashboard_data_propic_save">Carica</button>
            </div>
        </div>
    </div>

</div>