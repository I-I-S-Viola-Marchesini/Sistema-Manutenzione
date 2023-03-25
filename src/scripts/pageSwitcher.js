const routes = {
    '/': {
        'id': 'home',
        'page' : 'components/_home.php',
        'script' : undefined,
        'title' : 'Home',
        'type' : 'page',
        'menu': ['navbar', 'offcanvas']
    },
    '/textEditor': {
        'id': 'textEditor',
        'page' : 'components/_editorTest.php',
        'script' : 'scripts/_textEditors.js',
        'title' : 'Text Editor',
        'type' : 'page',
        'menu': ['navbar']
    },
    '/bootstrap': {
        'id': 'bootstrap',
        'page' : 'components/_bstemp.php',
        'script' : undefined,
        'title' : 'Bootstrap',
        'type' : 'page',
        'menu': ['navbar', 'offcanvas'],
    },
    '/login': {
        'id': 'login',
        'page' : 'components/_login.php',
        'script' : undefined,
        'title' : 'Login',
        'type' : 'page',
        'menu': ['offcanvas', 'navbar']
    },
    '/404': {
        'id': '404',
        'page' : 'components/_404.php',
        'script' : undefined,
        'title' : 'Errore 404',
        'type' : '404error',
        'menu': []
    },
};

document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.getElementById("menu_navbar");
    let offcanvas = document.getElementById("menu_offcanvas");

    function navbar_item_template (route) {
        return '<li class="nav-item"><a class="nav-link menu-route" href="#' + route + '" route-id="' + routes[route].id  + '">' + routes[route].title + '</a></li>';
    }

    function offcanvas_item_template (route) {
        return '<a href="#' + route + '" class="list-group-item list-group-item-action menu-route" route-id="' + routes[route].id  + '">' + routes[route].title + '</a>';
    }

    for (let route in routes) {
        if (routes[route].menu.includes('navbar')) {
            navbar.innerHTML += navbar_item_template(route);
        }
        if (routes[route].menu.includes('offcanvas')) {
            offcanvas.innerHTML += offcanvas_item_template(route);
        }
    }
});

window.addEventListener("hashchange", switcher, false);
window.addEventListener("load", switcher, false);

function switcher() {
    let page = window.location.hash.substring(1);
    if (page == ''){
        window.location.href = '#/';
        return;
    }

    document.cookie = "page=" + page + "; path=/; sameSite=strict;";

    if (routes[page] == undefined) {
        console.log("Route (" + page + ") doesn't point to any page. Loading 404 page.")
        loadPage('/404');
        return;
    }else{
        loadPage(page);
    }
}

function loadPage(route) {

    let spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");

    let menuElements = document.querySelectorAll(".menu-route");

    menuElements.forEach(function (menuElement) {
        menuElement.classList.remove("active");
        if (menuElement.getAttribute("route-id") == routes[route].id) {
            menuElement.classList.add("active");
        }
    });

    let pageRequest = new XMLHttpRequest();
    pageRequest.open("GET", routes[route].page, true);
    console.log("Requested page at: " + routes[route].page);
    pageRequest.onreadystatechange = function () {
        if (pageRequest.readyState == 4 && (pageRequest.status == 200 || routes[route].type == '404error')) {
            console.log("Page at (" + routes[route].page + ") loaded successfully.");
            document.getElementById("contents").innerHTML = pageRequest.responseText;
            if (routes[route].script != undefined) {
                let scriptRequest = new XMLHttpRequest();
                scriptRequest.open("GET", routes[route].script, true);
                console.log("Requested script at: " + routes[route].script);
                scriptRequest.onreadystatechange = function () {
                    if (scriptRequest.readyState == 4 && scriptRequest.status == 200) {
                        console.log("Script at (" + routes[route].script + ") loaded successfully.");
                        eval(scriptRequest.responseText);
                        setTimeout(() => {  spinner.classList.add("d-none"); }, 200);
                    } else if (scriptRequest.readyState == 4 && scriptRequest.status != 200) {
                        console.error("Script at (" + routes[route].script + ") is 404 not found.");
                    }
                };
                scriptRequest.send();
            }else{
                setTimeout(() => {  spinner.classList.add("d-none"); }, 200);
            }
            document.title = routes[route].title + " - Sistema Manutenzione";
            try{
                bootstrap.Offcanvas.getInstance(document.querySelector('#offcanvas_menu')).hide();
            }catch(e){
                console.log("Offcanvas not found. Probably not loaded yet.");
            }
        } else if (pageRequest.readyState == 4 && pageRequest.status != 200) {
            console.log("Page at (" + routes[route].page + ") is 404 not found. Loading 404 page.")
            loadPage('/404');
        }
    };
    pageRequest.send();
    window.scrollTo(0, 0);
}