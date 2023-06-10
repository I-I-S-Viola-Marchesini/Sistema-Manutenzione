const messages = {
    "username_input": {
        "login_box_h1": "Accedi",
        "login_box_text": "Inserisci un email o un nome utente",
        "controls_back": "Indietro",
        "controls_next": "Avanti",
    },
    "tfa_input": {
        "login_box_h1": "Accedi",
        "login_box_text": "Inserisci il codice per la verifica in due passaggi",
        "controls_back": "Indietro",
        "controls_next": "Avanti",
    },
    "password_input": {
        "login_box_h1": "Accedi",
        "login_box_text": "Inserisci la tua password",
        "controls_back": "Indietro",
        "controls_next": "Avanti",
    }
};

let currentForm = undefined;

let fullLoaction = window.location.hash.substring(1);

//select parameters after ?
let parameters = "?" + fullLoaction.split('?')[1];
const urlParams = new URLSearchParams(parameters);

// window.addEventListener("message", function(event) {

//     console.log(event.data); // "hello there!"

//     // can message back using event.source.postMessage(...)
// });

//showForm(document.getElementById("tfa_input"), '0.5s', '0.3s');
showForm(document.getElementById("username_input"), '0.5s', '0.3s');
//document.getElementById("login_form_tfa").focus({ preventScroll: true });       tfa_time_left

document.querySelectorAll('.tfa_code_input').forEach(item => {
    item.addEventListener('input', event => {
        if (item.validity.patternMismatch) {
            item.value = item.value.slice(0, -1);
            return false;
        }
        if (item.value.length == 6) {
            document.getElementById("controls_next").click();
        }
        return true;
    })
})

setInterval(myTimer, 1000);

let minutes = 0;
let seconds = 0;

function myTimer() {

    if(minutes == 0 && seconds == 0) {
        return;
    }

    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    }

    document.getElementById("tfa_time_left").innerHTML = minutes + ":" + seconds;
}

window.onkeyup = function (event) {
    if (event.key == "Enter") {
        document.getElementById("controls_next").click();
    }
    if (event.key == "Escape") {
        document.getElementById("controls_back").click();
    }
}

window.onkeydown = function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
        document.getElementById("controls_next").click();
    }
}

document.getElementById("controls_next").addEventListener("click", function () {
    switch (currentForm.id) {
        case "username_input":
            //check if input is email or username
            let UsernameInput = document.getElementById("login_form_email").value;
            if (!isUsernameValid(UsernameInput)) {
                document.getElementById("login_form_email").classList.add("is-invalid");
                document.getElementById("login_form_email").focus({ preventScroll: true });
                document.getElementById("login_form_email_error").classList.remove("d-none");
                return;
            }
            document.getElementById("login_form_email").classList.remove("is-invalid");
            document.getElementById("login_form_email_error").classList.add("d-none");
            showForm(document.getElementById("password_input"), '0.5s');
            document.getElementById("login_form_password").focus({ preventScroll: true })
            break;
        case "password_input":
            //check if input is password
            let PasswordInput = document.getElementById("login_form_password").value;
            if (!isPasswordValid(PasswordInput)) {
                document.getElementById("login_form_password").classList.add("is-invalid");
                document.getElementById("login_form_password").focus({ preventScroll: true });
                document.getElementById("login_form_password_error").classList.remove("d-none");
                return;
            }
            document.getElementById("login_form_password").classList.remove("is-invalid");
            document.getElementById("login_form_password_error").classList.add("d-none");
            authenticate(document.getElementById("login_form_email"), document.getElementById("login_form_password"));
            break;
        case "tfa_input":
            //check if input is tfa code
            let TfaInput = document.getElementById("login_form_tfa").value;
            if (!isTFAValid(TfaInput)) {
                document.getElementById("login_form_tfa").classList.add("is-invalid");
                document.getElementById("login_form_tfa").focus({ preventScroll: true });
                document.getElementById("login_form_tfa_error").classList.remove("d-none");
                return;
            }
            document.getElementById("login_form_tfa").classList.remove("is-invalid");
            document.getElementById("login_form_tfa_error").classList.add("d-none");
            twoFactorAuth(document.getElementById("login_form_tfa"));
            break;
        default:
            alert("Errore: form non trovato.");
            window.location.reload();
            break;
    }
});

document.getElementById("controls_back").addEventListener("click", function () {
    switch (currentForm.id) {
        case "username_input":
            history.back();
            if (urlParams.get('type') == 'popup') window.close();
            break;
        case "tfa_input":
            showForm(document.getElementById("username_input"), '0.5s');
        case "password_input":
            showForm(document.getElementById("tfa_input"), '0.5s');
            break;
        default:
            alert("Errore: form non trovato.");
            window.location.reload();
            break;
    }
});

function isUsernameValid(username, onlyEmail = false) {
    if (username == null || username == "" || username == undefined || username.length < 3) {
        return false; // Controllo fallisce se username è null, undefined, vuoto o minore di 3 caratteri
    } else if ((username.includes("@") && (username.length > 100 || !username.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))) {
        return false; // Controllo fallisce se username contiene @ e ha più di 100 caratteri o non è un indirizzo email valido
    } else if (!username.includes("@") && (username.length > 40 || onlyEmail)) {
        return false; // Controllo fallisce se username non contiene @ e ha più di 40 caratteri (solo se onlyEmail è false)
    }
    return true;
}

function isPasswordValid(password) {
    if (password == null || password == "" || password == undefined || password.length < 8) {
        return false;
    }
    return true;
}

function isTFAValid(tfa) {
    if (tfa == null || tfa == "" || tfa == undefined || tfa.length != 6) {
        return false;
    }
    return true;
}

const authErrorModal = new bootstrap.Modal(document.getElementById('auth_error_modal'));
const apiErrorModal = new bootstrap.Modal(document.getElementById('api_error_modal'));

function authenticate(UsernameInput, PasswordInput) {

    let loginData = {
        "email_user": UsernameInput.value,
        "password": PasswordInput.value,
    };

    let loginRequest = new XMLHttpRequest();
    loginRequest.open("POST", 'backend/API/Api/User/Login.php', true);
    loginRequest.setRequestHeader('Content-type', 'application/json');
    loginRequest.onreadystatechange = function () {
        if (loginRequest.readyState == 4 && loginRequest.status == 200) {

            let userId = JSON.parse(loginRequest.responseText).userId;
            Cookies.set("userId", userId, { path: '/', sameSite: 'strict' });
            
            // let token = JSON.parse(loginRequest.responseText).token;
            // let sessionId = JSON.parse(loginRequest.responseText).session;

            //window.localStorage.setItem("token", token);
            //window.localStorage.setItem("status", "logged_in");
            //Cookies.set("sessionId", sessionId, { path: '/', sameSite: 'strict' });

            if (urlParams.get('type') == 'popup') {
                window.close();
                return;
            }

            //window.location.replace("#/dashboard");
            minutes = 5;
            seconds = 0;
            showForm(document.getElementById("tfa_input"), '0.5s');
            document.getElementById("login_form_tfa").focus({ preventScroll: true });

        } else if (loginRequest.readyState == 4 && loginRequest.status == 401) {
            authErrorModal.show();
            showForm(document.getElementById("username_input"), '0.5s');
        } else if (loginRequest.readyState == 4 && (loginRequest.status == 400 || loginRequest.status == 500 || loginRequest.status == 404 || loginRequest.status == 403)) {
            apiErrorModal.show();
            showForm(document.getElementById("username_input"), '0.5s');
        }
    };
    PasswordInput.value = "";
    loginRequest.send(JSON.stringify(loginData));
}

function twoFactorAuth(TwoFactorInput) {

    let loginData = {
        "user_id": Cookies.get("userId"),
        "two_factor_code": TwoFactorInput.value,
    };

    let loginRequest = new XMLHttpRequest();
    loginRequest.open("POST", 'backend/API/Api/User/getTokenAndSession.php', true);
    loginRequest.setRequestHeader('Content-type', 'application/json');
    loginRequest.onreadystatechange = function () {
        if (loginRequest.readyState == 4 && loginRequest.status == 200) {

            if(JSON.parse(loginRequest.responseText).message == "Code expired") {
                document.getElementById("login_form_tfa").classList.add("is-invalid");
                document.getElementById("login_form_tfa").focus({ preventScroll: true });
                document.getElementById("login_form_tfa_error").classList.remove("d-none");
                return;
            }

            let token = JSON.parse(loginRequest.responseText).token;
            let sessionId = JSON.parse(loginRequest.responseText).session;

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("status", "logged_in");
            Cookies.set("sessionId", sessionId, { path: '/', sameSite: 'strict' });

            if (urlParams.get('type') == 'popup') {
                window.close();
                return;
            }

            window.location.replace("#/dashboard");

            showForm(document.getElementById("tfa_input"), '0.5s');
            document.getElementById("login_form_tfa").focus({ preventScroll: true });

        } else if (loginRequest.readyState == 4 && loginRequest.status == 401) {
            authErrorModal.show();
            showForm(document.getElementById("username_input"), '0.5s');
        } else if (loginRequest.readyState == 4 && (loginRequest.status == 400 || loginRequest.status == 500 || loginRequest.status == 404 || loginRequest.status == 403)) {
            apiErrorModal.show();
            showForm(document.getElementById("username_input"), '0.5s');
        }
    };
    loginRequest.send(JSON.stringify(loginData));
}
//Mostra un form
function showForm(element, speed, delay = 0) {

    if (currentForm != undefined) {
        //Nasconde il form precedente
        currentForm.style.animation = "slide_hide 0s forwards";
        currentForm.style.animationDelay = delay;
    }

    //Imposta il form corrente
    currentForm = element;

    //Mostra il form
    element.style.animation = "slide_show " + speed + " forwards";
    element.style.animationDelay = delay;

    //Mostra il testo
    document.getElementById("login_box_h1").innerHTML = messages[element.id]["login_box_h1"];
    document.getElementById("login_box_text").innerHTML = messages[element.id]["login_box_text"];
    document.getElementById("controls_back_text").innerHTML = messages[element.id]["controls_back"];
    document.getElementById("controls_next").innerHTML = messages[element.id]["controls_next"];

    if (messages[element.id]["controls_next"] != null) {
        document.getElementById("controls_next").classList.remove("disabled");
    } else {
        document.getElementById("controls_next").classList.add("disabled");
    }

    if (messages[element.id]["controls_back"] != null) {
        document.getElementById("controls_back").classList.remove("disabled");
    } else {
        document.getElementById("controls_back").classList.add("disabled");
    }
}

const resetPasswordUseEmail = new bootstrap.Modal(document.getElementById('reset_password_use_email'));
const resetPasswordCaptcha = new bootstrap.Modal(document.getElementById('reset_password_captcha'));

document.getElementById("init_reset_password").addEventListener("click", function () {
    if (!isUsernameValid(document.getElementById("login_form_email").value, true)) {
        document.getElementById("login_form_email").classList.add("is-invalid");
        document.getElementById("login_form_email").focus({ preventScroll: true });
        resetPasswordUseEmail.show();
        showForm(document.getElementById("username_input"), '0.5s');
        return;
    }
    resetPasswordCaptcha.show();
    render_hCaptcha('captcha_container', false);
});

document.getElementById("reset_password_captcha_submit").addEventListener("click", function () {
    let captchaResponse = hcaptcha.getResponse();
    console.log(captchaResponse);
    if (captchaResponse == null || captchaResponse == "" || captchaResponse == undefined) {
        document.getElementById("captcha_container_error").classList.remove("d-none");
        return;
    }

    let resetData = {
        "email": document.getElementById("login_form_email").value,
        "type": "external_captcha",
        "token": captchaResponse,
    };

    let resetRequest = new XMLHttpRequest();
    resetRequest.open("POST", 'backend/API/Api/User/Recupero_password.php', true);
    resetRequest.setRequestHeader('Content-type', 'application/json');
    resetRequest.onreadystatechange = function () {
        if (resetRequest.readyState == 4 && resetRequest.status == 200) {
            window.location.replace("#/dashboard");
        } else if (resetRequest.readyState == 4 && resetRequest.status == 401) {
            authErrorModal.show();
            showForm(document.getElementById("username_input"), '0.5s');
        } else if (resetRequest.readyState == 4 && (resetRequest.status == 400 || resetRequest.status == 500 || resetRequest.status == 404 || resetRequest.status == 403)) {
            apiErrorModal.show();
            showForm(document.getElementById("username_input"), '0.5s');
        }
    };
    resetRequest.send(JSON.stringify(resetData));
});