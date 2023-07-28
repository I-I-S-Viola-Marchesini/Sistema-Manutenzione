let nameInput = document.getElementById("dashboard_data_name");
let nameInputChars = document.getElementById("dashboard_data_name_chars");

let usernameInput = document.getElementById("dashboard_data_username");
let usernameInputChars = document.getElementById("dashboard_data_username_chars");

let emailInput = document.getElementById("dashboard_data_email");
let emailInputChars = document.getElementById("dashboard_data_email_chars");

let propicUploaded = document.getElementById("propic_uploaded");
let propicAvatar = document.getElementById("propic_avatar");

let propicUploadedImg = document.getElementById("propic_uploaded_img");
let propicAvatarImg = document.getElementById("propic_avatar_img");

let userData = {
    "user_id": Cookies.get("userId"),
};

let dataRequest = new XMLHttpRequest();
dataRequest.open("POST", 'backend/API/Api/User/get_data.php', true);
dataRequest.setRequestHeader('Content-type', 'application/json');
dataRequest.onreadystatechange = function () {
    if (dataRequest.readyState == 4 && dataRequest.status == 200) {

        let data = JSON.parse(dataRequest.responseText);

        nameInput.value = data.nome;
        nameInputChars.innerText = nameInput.value.length;
    
        propicAvatarImg.src = "https://ui-avatars.com/api/?format=svg&background=7d3ff8&color=FFF&name=" + data.nome;

        usernameInput.value = data.username;
        usernameInputChars.innerText = usernameInput.value.length;

        emailInput.value = data.email;
        emailInputChars.innerText = emailInput.value.length;

        propicUploadedImg.src = "images/" + data.immagine_profilo;

        if (data.stile_immagine_profilo == 'text_avatar') {
            propicAvatar.checked = true;
        } else if (data.stile_immagine_profilo == 'custom_avatar') {
            propicUploaded.checked = true;
        }

    } else if (dataRequest.readyState == 4 && dataRequest.status == 401) {
        alert("Non sei autorizzato a visualizzare questa pagina.");
    } else if (dataRequest.readyState == 4 && (dataRequest.status == 400 || dataRequest.status == 500 || dataRequest.status == 404 || dataRequest.status == 403)) {
        alert("Si è verificato un errore.");
    }
};
dataRequest.send(JSON.stringify(userData));

nameInput.addEventListener("input", function () {
    nameInputChars.innerText = nameInput.value.length;

    if (nameInput.value.length > 40 || nameInput.value.length < 3) {
        nameInput.classList.remove("is-valid");
        nameInput.classList.add("is-invalid");
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }

});

usernameInput.addEventListener("input", function () {
    usernameInputChars.innerText = usernameInput.value.length;

    if (nameInput.value.length > 40 || nameInput.value.length < 3) {
        nameInput.classList.remove("is-valid");
        nameInput.classList.add("is-invalid");
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }

});

emailInput.addEventListener("input", function () {
    emailInputChars.innerText = emailInput.value.length;

    if (nameInput.value.length > 100 || nameInput.value.length < 3) {
        nameInput.classList.remove("is-valid");
        nameInput.classList.add("is-invalid");
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }

});