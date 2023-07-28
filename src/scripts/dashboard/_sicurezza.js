passwordRequirements(null);


document.getElementById("dashboard_security_confirm").addEventListener("click", function () {
    let oldPassword = document.getElementById("dashboard_security_oldpassword");
    oldPassword.disabled = true;

    let confirmAccountCollapse = document.getElementById('confirm_account_collapse');
    confirmAccountCollapse.style.display = "none";

    let newPassword = document.getElementById("dashboard_security_newpassword");
    let repeatPassword = document.getElementById("dashboard_security_repeat_newpassword");
    
    newPassword.disabled = false;
    newPassword.focus();
});

document.getElementById("dashboard_security_newpassword").addEventListener("keyup", function () {
    let newPassword = document.getElementById("dashboard_security_newpassword");
    let repeatPassword = document.getElementById("dashboard_security_repeat_newpassword");
    repeatPassword.value = "";
    let newPasswordValue = newPassword.value;

    if(passwordRequirements(newPasswordValue)){
        newPassword.classList.remove("is-invalid");
        newPassword.classList.add("is-valid");
        repeatPassword.disabled = false;
    }else{
        newPassword.classList.remove("is-valid");
        newPassword.classList.add("is-invalid");
        repeatPassword.disabled = true;
    }
    
});

document.getElementById("dashboard_security_repeat_newpassword").addEventListener("keyup", function () {
    let newPassword = document.getElementById("dashboard_security_newpassword");
    let repeatPassword = document.getElementById("dashboard_security_repeat_newpassword");
    let changePasswordButton = document.getElementById("dashboard_security_change");

    if(newPassword.value == repeatPassword.value && newPassword.value != "" && repeatPassword.value != "" && passwordRequirements(newPassword.value)){
        repeatPassword.classList.remove("is-invalid");
        repeatPassword.classList.add("is-valid");
        changePasswordButton.disabled = false;
    }else{
        repeatPassword.classList.remove("is-valid");
        repeatPassword.classList.add("is-invalid");
        changePasswordButton.disabled = true;
    }
});

document.getElementById('dashboard_security_show_password').addEventListener("click", function () {
    let newPassword = document.getElementById("dashboard_security_newpassword");
    let repeatPassword = document.getElementById("dashboard_security_repeat_newpassword");

    if(newPassword.type == "password"){
        newPassword.type = "text";
        repeatPassword.type = "text";
    }else{
        newPassword.type = "password";
        repeatPassword.type = "password";
    }
});

function passwordRequirements(password){
    
    const passwordRequirements = [
        'password_req_length',
        'password_req_uppercase',
        'password_req_lowercase',
        'password_req_number',
        'password_req_special',
        'password_req_sequence',
        'password_req_dictionary'
    ];

    let requirementsDash = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#adb5bd" class="bi bi-dash-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/></svg>'
    let requirementsX = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF0000" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" /></svg>'
    let requirementsCheck = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00FF00" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" /></svg>'

    let validPassword = true;

    passwordRequirements.forEach(element => {
        if(password == null){
            document.getElementById(element).innerHTML = requirementsDash;
            return;
        }

        switch(element){
            case 'password_req_length':
                if(password.length >= 8){
                    document.getElementById(element).innerHTML = requirementsCheck;
                }else{
                    document.getElementById(element).innerHTML = requirementsX;
                    validPassword = false;
                }
                break;
            case 'password_req_uppercase':
                if(password.match(/[A-Z]/)){
                    document.getElementById(element).innerHTML = requirementsCheck;
                }else{
                    document.getElementById(element).innerHTML = requirementsX;
                    validPassword = false;
                }
                break;
            case 'password_req_lowercase':
                if(password.match(/[a-z]/)){
                    document.getElementById(element).innerHTML = requirementsCheck;
                }else{
                    document.getElementById(element).innerHTML = requirementsX;
                    validPassword = false;
                }
                break;
            case 'password_req_number':
                if(password.match(/[0-9]/)){
                    document.getElementById(element).innerHTML = requirementsCheck;
                }else{
                    document.getElementById(element).innerHTML = requirementsX;
                    validPassword = false;
                }
                break;
            case 'password_req_special':
                if(password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)){
                    document.getElementById(element).innerHTML = requirementsCheck;
                }else{
                    document.getElementById(element).innerHTML = requirementsX;
                    validPassword = false;
                }
                break;
            case 'password_req_sequence':
                if(password.match(/([a-zA-Z0-9])\1\1/)){
                    document.getElementById(element).innerHTML = requirementsX;
                    validPassword = false;
                }else{
                    document.getElementById(element).innerHTML = requirementsCheck;
                }
                break;
            case 'password_req_dictionary':
                //TODO: check if password is in dictionary
                document.getElementById(element).innerHTML = requirementsDash;
                break;
        }

    });

    return validPassword;
}