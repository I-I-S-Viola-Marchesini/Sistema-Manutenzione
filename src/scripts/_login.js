let formEmail = document.getElementById("login_form_email");
let formPassword = document.getElementById("login_form_password");

document.getElementById("login_button").addEventListener("click", function () {
    var loginData = getLogin();
    console.log(loginData);
});

document.getElementById("forgot_password_button").addEventListener("click", function () {
    formEmail.popover();
});

function getLogin() {

    if(areFieldsEmpty()) {
        return;
    }

    formEmail.classList.remove("is-invalid");
    formPassword.classList.remove("is-invalid");

    var email = formEmail.value;
    var password = formPassword.value;

    let loginData = {
        "email": email,
        "password": password
    };

    let loginRequest = new XMLHttpRequest();
    loginRequest.open("POST", 'api/user/Login.php', true);
    loginRequest.setRequestHeader('Content-type', 'application/json');
    loginRequest.onreadystatechange = function () {
        if (loginRequest.readyState == 4 && loginRequest.status == 200) {
            showLoginMessage("Login successful. Redirecting...", "success");
        } else if (loginRequest.readyState == 4) {
            showLoginMessage("Login failed. Please try again.", "danger");
        }
    };
    loginRequest.send(JSON.stringify(loginData));
}

function areFieldsEmpty() {
    let result = false;

        if(formEmail.value == "" || formEmail.value == null) {
        formEmail.classList.add("is-invalid");
        showLoginMessage("Please fill in all fields.", "warning");
        result = true;
    }

    if(formPassword.value == "" || formPassword.value == null) {
        formPassword.classList.add("is-invalid");
        showLoginMessage("Please fill in all fields.", "warning");
        result = true;
    }

    return result;
}

function showLoginMessage(message, type) {
    document.getElementById("login_message").classList.remove("d-none");
    document.getElementById("login_message").classList.remove("alert-success");
    document.getElementById("login_message").classList.remove("alert-danger");
    document.getElementById("login_message").classList.add("alert-" + type);
    document.getElementById("login_message").innerHTML = message;
}