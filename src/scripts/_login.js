let formEmail = document.getElementById("login_form_email");
let formPassword = document.getElementById("login_form_password");

document.getElementById("login_button").addEventListener("click", function () {
    var loginData = getLogin();
    console.log(loginData);
});

document.getElementById("forgot_password_button").addEventListener("click", function () {
    formEmail.popover();
});

formEmail.addEventListener('keyup', function () {
    let knownDomains = [
        "@iisviolamarchesini.edu.it",
        "@gmail.com",
    ];
    let emailValue = "";
    if(formEmail.value.includes("@")) emailValue = formEmail.value.replace(/.*@/, "@");
    
    let autocompleteList = document.getElementById("login_form_autocomplete_list");
    autocompleteList.innerHTML = "";
    formEmail.classList.remove("rounded-bottom-0");
    
    if(emailValue.length > 0){ 
        for(let i = 0; i < knownDomains.length; i++){
            if(knownDomains[i].startsWith(emailValue) && emailValue != knownDomains[i]){
                //console.log("Domain found: " + knownDomains[i]);
                formEmail.classList.add("rounded-bottom-0");
                autocompleteList.innerHTML += "<a class=\"login-form-autocomplete-item list-group-item list-group-item-action cursor-pointer text-end\" style=\"cursor: pointer;\">" + knownDomains[i]  + "</a>";
            }
        }
    }

    document.querySelectorAll(".login-form-autocomplete-item").forEach(function (item) {
        item.addEventListener("click", function () {
            //autocomplete doamin
            formEmail.value = formEmail.value.replace(/@.*/, "") + item.innerHTML;
            autocompleteList.innerHTML = "";
            formEmail.classList.remove("rounded-bottom-0");
        });
    });
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