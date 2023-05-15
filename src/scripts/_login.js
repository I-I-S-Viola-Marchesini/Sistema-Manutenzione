const messages = {
    "username_input": {
        "login_box_h1": "Accedi",
        "login_box_text": "Inserisci un email o un nome utente",
        "controls_back": "Indietro",
        "controls_next": "Avanti",
    },
    "password_input": {
        "login_box_h1": "Accedi",
        "login_box_text": "Inserisci la tua password",
        "controls_back": "Indietro",
        "controls_next": "Avanti",
    },
    "saved_accounts": {
        "login_box_h1": "Accedi",
        "login_box_text": "Seleziona un account:",
        "controls_back": "Indietro",
        "controls_next": "Avanti",
    }
};

let currentForm = undefined;

//showForm(document.getElementById("saved_accounts"), '0.5s', '0.3s');
showForm(document.getElementById("username_input"), '0.5s', '0.3s');
document.getElementById("login_form_email").focus({preventScroll: true});

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
    switch(currentForm.id){
        case "username_input":
            //check if input is email or username
            let UsernameInput = document.getElementById("login_form_email").value;
            if(!isUsernameValid(UsernameInput)){
                document.getElementById("login_form_email").classList.add("is-invalid");
                document.getElementById("login_form_email").focus({preventScroll: true});
                document.getElementById("login_form_email_error").classList.remove("d-none");
                return;
            }
            document.getElementById("login_form_email").classList.remove("is-invalid");
            document.getElementById("login_form_email_error").classList.add("d-none");
            showForm(document.getElementById("password_input"), '0.5s');
            document.getElementById("login_form_password").focus({preventScroll: true})
            break; //non necessario, ma per sicurezza...
        case "password_input":
            //check if input is password
            let PasswordInput = document.getElementById("login_form_password").value;
            if(!isPasswordValid(PasswordInput)){
                document.getElementById("login_form_password").classList.add("is-invalid");
                document.getElementById("login_form_password").focus({preventScroll: true});
                document.getElementById("login_form_password_error").classList.remove("d-none");
                return;
            }
            document.getElementById("login_form_password").classList.remove("is-invalid");
            document.getElementById("login_form_password_error").classList.add("d-none");
            authenticate(document.getElementById("login_form_email"), document.getElementById("login_form_password"));
            break;
        default:
            alert("Errore: form non trovato.");
            window.location.reload();
            break;
    }
});

document.getElementById("controls_back").addEventListener("click", function () {
    switch(currentForm.id){
        case "username_input":
            history.back();
            break;
        case "password_input":
            showForm(document.getElementById("username_input"), '0.5s');
            break;
        default:
            alert("Errore: form non trovato.");
            window.location.reload();
            break;
    }
});

function isUsernameValid(username){
    if(username == null || username == "" || username == undefined || username.length < 3){
        return false;
    }else if(!username.includes("@") && username.length > 40){
        return false;
    }else if((username.includes("@") && (username.length > 100 || !username.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))){
        return false;
    }
    return true;
}

function isPasswordValid(password){
    if(password == null || password == "" || password == undefined || password.length < 8){
        return false;
    }
    return true;
}

const authErrorModal = new bootstrap.Modal(document.getElementById('auth_error_modal'));
const apiErrorModal = new bootstrap.Modal(document.getElementById('api_error_modal'));

function authenticate(UsernameInput, PasswordInput){
    let loginData = {
        "email_user": UsernameInput.value,
        "password": PasswordInput.value,
    };

    let loginRequest = new XMLHttpRequest();
    loginRequest.open("POST", 'backend/API/api/Login.php', true);
    loginRequest.setRequestHeader('Content-type', 'application/json');
    loginRequest.onreadystatechange = function () {
        if (loginRequest.readyState == 4 && loginRequest.status == 200) {
            window.location.replace("/#/dashboard");
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
function showForm(element, speed, delay = 0){

    if(currentForm != undefined){
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

    if(messages[element.id]["controls_next"] != null){
        document.getElementById("controls_next").classList.remove("disabled");
    }else{
        document.getElementById("controls_next").classList.add("disabled");
    }

    if(messages[element.id]["controls_back"] != null){
        document.getElementById("controls_back").classList.remove("disabled");
    }else{
        document.getElementById("controls_back").classList.add("disabled");
    }
}

// //Nasconde un form
// function slideHide(element, speed, delay = 0){
//     element.style.animation = "slide_hide " + speed + " forwards";
//     element.style.animationDelay = delay;
// }


// let formEmail = document.getElementById("login_form_email");
// let formPassword = document.getElementById("login_form_password");

// document.getElementById("login_button").addEventListener("click", function () {
//     var loginData = getLogin();
//     console.log(loginData);
// });

// document.getElementById("forgot_password_button").addEventListener("click", function () {
//     formEmail.popover();
// });

// formEmail.addEventListener('keyup', function () {
//     let knownDomains = [
//         "@iisviolamarchesini.edu.it",
//         "@gmail.com",
//     ];
//     let emailValue = "";
//     if(formEmail.value.includes("@")) emailValue = formEmail.value.replace(/.*@/, "@");
    
//     let autocompleteList = document.getElementById("login_form_autocomplete_list");
//     autocompleteList.innerHTML = "";
//     formEmail.classList.remove("rounded-bottom-0");
    
//     if(emailValue.length > 0){ 
//         for(let i = 0; i < knownDomains.length; i++){
//             if(knownDomains[i].startsWith(emailValue) && emailValue != knownDomains[i]){
//                 //console.log("Domain found: " + knownDomains[i]);
//                 formEmail.classList.add("rounded-bottom-0");
//                 autocompleteList.innerHTML += "<a class=\"login-form-autocomplete-item list-group-item list-group-item-action cursor-pointer text-end\" style=\"cursor: pointer;\">" + knownDomains[i]  + "</a>";
//             }
//         }
//     }

//     document.querySelectorAll(".login-form-autocomplete-item").forEach(function (item) {
//         item.addEventListener("click", function () {
//             //autocomplete doamin
//             formEmail.value = formEmail.value.replace(/@.*/, "") + item.innerHTML;
//             autocompleteList.innerHTML = "";
//             formEmail.classList.remove("rounded-bottom-0");
//         });
//     });
// });
 
// function getLogin() {

//     if(areFieldsEmpty()) {
//         return;
//     }

//     formEmail.classList.remove("is-invalid");
//     formPassword.classList.remove("is-invalid");

//     var email = formEmail.value;
//     var password = formPassword.value;

//     let loginData = {
//         "email": email,
//         "password": password
//     };

//     let loginRequest = new XMLHttpRequest();
//     loginRequest.open("POST", 'api/user/Login.php', true);
//     loginRequest.setRequestHeader('Content-type', 'application/json');
//     loginRequest.onreadystatechange = function () {
//         if (loginRequest.readyState == 4 && loginRequest.status == 200) {
//             showLoginMessage("Login successful. Redirecting...", "success");
//         } else if (loginRequest.readyState == 4) {
//             showLoginMessage("Login failed. Please try again.", "danger");
//         }
//     };
//     loginRequest.send(JSON.stringify(loginData));
// }

// function areFieldsEmpty() {
//     let result = false;

//         if(formEmail.value == "" || formEmail.value == null) {
//         formEmail.classList.add("is-invalid");
//         showLoginMessage("Please fill in all fields.", "warning");
//         result = true;
//     }

//     if(formPassword.value == "" || formPassword.value == null) {
//         formPassword.classList.add("is-invalid");
//         showLoginMessage("Please fill in all fields.", "warning");
//         result = true;
//     }

//     return result;
// }

// function showLoginMessage(message, type) {
//     document.getElementById("login_message").classList.remove("d-none");
//     document.getElementById("login_message").classList.remove("alert-success");
//     document.getElementById("login_message").classList.remove("alert-danger");
//     document.getElementById("login_message").classList.add("alert-" + type);
//     document.getElementById("login_message").innerHTML = message;
// }