let token = undefined;
let session = undefined;

let sessionExpiredModal = new bootstrap.Modal(document.getElementById('sessionExpiredModal'), {
    keyboard: false,
    backdrop: 'static'
});

let sessionRefreshSuccess = new bootstrap.Toast(document.getElementById('sessionRefreshSuccess'), {
    animation: true,
    autohide: true,
    delay: 5000
});

let checkSessionData = function() {

    let lastSessionId = Cookies.get("sessionId");
    let lastToken = localStorage.getItem("token");

    return function() {

        let currentSessionId = Cookies.get("sessionId");
        let currentToken = localStorage.getItem("token");

        if ((lastSessionId != currentSessionId) || (lastToken != currentToken)) {

            SessionManager();

            lastSessionId = currentSessionId;
            lastToken = currentToken;

        }
    };
}();

window.setInterval(checkSessionData, 100); // run every 100 ms

window.addEventListener("hashchange", SessionManager, false);
window.addEventListener("load", SessionManager, false);
window.addEventListener("DOMContentLoaded", function () {
    loadLoginButtons();
    SessionManager();
});

function SessionManager() {

    let fullLoaction = window.location.hash.substring(1);
    let page = fullLoaction.split('?')[0];
    let parameters = "?" + fullLoaction.split('?')[1];
    let urlParams = new URLSearchParams(parameters);

    token = localStorage.getItem("token");
    session = Cookies.get("sessionId");

    sessionExpiredModal.hide();
    blurContent(0);

    //alert("SessionManager " + page + " " + isValidKey(token) + " " + isValidKey(session) + " " + urlParams.get("type") + " " + urlParams.get("backto"));

    if (page == '/login' && isValidKey(token) && isValidKey(session)) {
        if (urlParams.get("type") == 'popup') {
            window.close();
            return;
        }
        if (urlParams.get("backto") != null && urlParams.get("backto") != undefined) {
            window.location.href = '#/' + urlParams.get("backto");
            return;
        }
        window.location.href = '#/dashboard';
        return;
    } else if (isValidKey(token) && isValidKey(session) && page != '/login') {
        return;
    }

    if (isValidKey(token) && !isValidKey(session)) {
        if(page == '/login') return;
        blurContent(15);
        sessionExpiredModal.show();
        return;
    }

    if (!isValidKey(token)) {
        window.location.href = '#/login';
        return;
    }

}

function blurContent(px) {
    document.querySelectorAll(".blurrable").forEach(function (element) {
        element.style.filter = "blur(" + px + "px)";
        element.style.webkitFilter = "blur(" + px + "px)";
    }
    );
}

function isValidKey(key) {
    if (key == undefined || key == null) return false;
    if (key == "" || key.length != 64) return false;
    return true;
}

function loadLoginButtons() {
    document.querySelectorAll("[data-target='login']").forEach(function (element) {

        if (isValidKey(token) && isValidKey(session)) {
            element.classList.add("disabled");
            return;
        }

        element.classList.remove("disabled");

        element.addEventListener("click", function () {
            openAuthPopup(element);
        }, { once: true });
    });
}

function openAuthPopup(element) {

    console.log("openAuthPopup");

    // let spinner = document.getElementById("spinner");
    // spinner.classList.remove("d-none");

    const innerHTML = element.innerHTML;
    let id = element.getAttribute("data-id");

    element.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Autenticazione...';
    element.classList.add("btn-secondary");

    const popupCenter = ({ url, title, w, h }) => {
        // Fixes dual-screen position                             Most browsers      Firefox
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft
        const top = (height - h) / 2 / systemZoom + dualScreenTop
        const newWindow = window.open(url, title,
            `
          scrollbars=yes,
          width=${w / systemZoom}, 
          height=${h / systemZoom}, 
          top=${top} + 50, 
          left=${left}
          `
        )

        if (window.focus) newWindow.focus();

        // newWindow.addEventListener('load', function () {
        //     alert("load");
        // });

        newWindow.addEventListener('close', function () {
            console.log("close");
        });

        newWindow.addEventListener('beforeunload', function () {
            alert("beforeunload");
            element.innerHTML = innerHTML;
            element.classList.remove("btn-secondary");
            loadLoginButtons();
            //SessionManager();
            if (isValidKey(Cookies.get("sessionId")) && Cookies.get("sessionId") != session) {
                SessionManager();
                sessionRefreshSuccess.show();
            }
        }
        );
    }

    popupCenter({ url: '/#/login?type=popup', title: 'Login - ' + id, w: 600, h: 700 });


}