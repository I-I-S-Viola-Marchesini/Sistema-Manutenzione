let dashboardSidebar = null;
try {
    dashboardSidebar = document.getElementById("dashboard_sidebar");
    dashboardSidebar.innerHTML = '';
} catch (e) {
    console.log("Dashboard sidebar is not loaded.");
}

let tab = sessionStorage.getItem("lastRoute");

function sidebar_item_template(route, btn_class) {
    return '<a class="btn ' + btn_class + '" href="#' + route + '" route-id="' + routes[route].id + '" role="button">' + routes[route].title + '</a>'
}

for (let route in routes) {
    if (routes[route].menu.includes('dashboard_sidebar')) {
        if (dashboardSidebar != null) {
            let btn_class = "btn-light";
            if (tab == routes[route].id) btn_class = "btn-primary";
            dashboardSidebar.innerHTML += sidebar_item_template(route, btn_class);
        }
    }
}

let sidebarFullName = document.getElementById("sidebar_user_fullname");
let sidebarUsername = document.getElementById("sidebar_user_username");
let sidebarPropic = document.getElementById("sidebar_user_propic");

let changePropicBtn = document.querySelectorAll(".change-propic-button");

changePropicBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        window.location.href = '#/dashboard/anagrafica#editProPic'
    });
});

let userData = {
    "user_id": Cookies.get("userId"),
};

let sidebarDataRequest = new XMLHttpRequest();
sidebarDataRequest.open("POST", 'backend/API/Api/User/get_data.php', true);
sidebarDataRequest.setRequestHeader('Content-type', 'application/json');
sidebarDataRequest.onreadystatechange = function () {
    if (sidebarDataRequest.readyState == 4 && sidebarDataRequest.status == 200) {

        let data = JSON.parse(sidebarDataRequest.responseText);

        sidebarFullName.innerText = data.nome;
        sidebarUsername.innerText = "@" + data.username;

        if(data.stile_immagine_profilo == 'text_avatar') {
            sidebarPropic.style.backgroundImage = "url('https://ui-avatars.com/api/?format=svg&background=7d3ff8&color=FFF&name=" + data.nome + "')";
        }else if(data.stile_immagine_profilo == 'custom_avatar') {
            sidebarPropic.style.backgroundImage = "url('images/" + data.immagine_profilo + "')";
        }

    } else if (sidebarDataRequest.readyState == 4 && sidebarDataRequest.status == 401) {
        alert("Non sei autorizzato a visualizzare questa pagina.");
    } else if (sidebarDataRequest.readyState == 4 && (sidebarDataRequest.status == 400 || sidebarDataRequest.status == 500 || sidebarDataRequest.status == 404 || sidebarDataRequest.status == 403)) {
        alert("Si è verificato un errore.");
    }
};
sidebarDataRequest.send(JSON.stringify(userData));