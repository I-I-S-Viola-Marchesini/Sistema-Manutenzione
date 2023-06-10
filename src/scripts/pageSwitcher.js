document.addEventListener("DOMContentLoaded", function () {

    let navbar = document.getElementById("menu_navbar");
    let offcanvas = document.getElementById("menu_offcanvas");
    let footerAccount = document.getElementById("menu_footer_account");
    let footerManagement = document.getElementById("menu_footer_management");

    function navbar_item_template(route) {
        return '<li class="nav-item"><a class="nav-link menu-route" href="#' + route + '" route-id="' + routes[route].id + '">' + routes[route].title + '</a></li>';
    }

    function offcanvas_item_template(route) {
        return '<a href="#' + route + '" class="list-group-item list-group-item-action menu-route" route-id="' + routes[route].id + '">' + routes[route].title + '</a>';
    }

    function footer_item_template(route) {
        return '<li class="nav-item mb-2"><a href="#' + route + '" class="nav-link p-0 text-body-secondary">' + routes[route].title + '</a></li>'
        //return '<a href="#' + route + '" class="dropdown-item menu-route" route-id="' + routes[route].id + '">' + routes[route].title + '</a>';
    }

    for (let route in routes) {
        if (routes[route].menu.includes('navbar')) {
            navbar.innerHTML += navbar_item_template(route);
        }
        if (routes[route].menu.includes('offcanvas')) {
            offcanvas.innerHTML += offcanvas_item_template(route);
        }
        if (routes[route].menu.includes('footer_account')) {
            footerAccount.innerHTML += footer_item_template(route);
        }
        if (routes[route].menu.includes('footer_management')) {
            footerManagement.innerHTML += footer_item_template(route);
        }
    }
});

window.addEventListener("hashchange", switcher, false);
window.addEventListener("load", switcher, false);

function switcher() {
    
    let fullLoaction = window.location.hash.substring(1);

    //select page before ?
    let page = fullLoaction.split('?')[0];

    //select parameters after ?
    let parameters = "?" + fullLoaction.split('?')[1];

    if (fullLoaction.split('?')[1] == undefined) parameters = '';

    if (page == '') {
        window.location.href = '#/';
        return;
    }

    // alert("Switching to page: " + page);
    // alert("Parameters: " + parameters);

    if (routes[page] == undefined) {
        if(aliases[page] != undefined){
            console.log("Route (" + page + ") is an alias. Redirecting to: " + aliases[page]);
            window.location.href = '#' + aliases[page];
            return;
        }
        console.log("Route (" + page + ") doesn't point to any page. Loading 404 page.")
        loadPage('/404', parameters);
        return;
    } else {
        loadPage(page, parameters);
    }


}

function loadPage(route, parameters) {

    if(route == undefined){
        console.log("Route is undefined.");
        return;
    }

    let spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");

    let menuElements = document.querySelectorAll(".menu-route");

    menuElements.forEach(function (menuElement) {
        menuElement.classList.remove("active");
        if (menuElement.getAttribute("route-id") == routes[route].id) {
            menuElement.classList.add("active");
        }
    });

    if (routes[route].type == 'redirect') {
        window.location.replace(routes[route].page);
    }

    let pageRequest = new XMLHttpRequest();
    pageRequest.open("GET", routes[route].page + parameters, true);
    console.log("Requested page at: " + routes[route].page);
    pageRequest.onreadystatechange = function () {
        if (pageRequest.readyState == 4 && (pageRequest.status == 200 || routes[route].type == '404error')) {
            console.log("Page at (" + routes[route].page + ") loaded successfully.");
            document.getElementById("contents").innerHTML = pageRequest.responseText;

            loadLoginButtons();

            if (routes[route].script != undefined) {

                let scriptRequest = new XMLHttpRequest();
                scriptRequest.open("GET", routes[route].script, true);
                scriptRequest.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0'); // No caching
                scriptRequest.setRequestHeader('Pragma', 'no-cache'); // No caching
                scriptRequest.setRequestHeader('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT'); // Cache instantly expires
                console.log("Requested script at: " + routes[route].script);
                scriptRequest.onreadystatechange = function () {
                    if (scriptRequest.readyState == 4 && scriptRequest.status == 200) {
                        console.log("Script at (" + routes[route].script + ") loaded successfully.");
                        eval(scriptRequest.responseText);
                        setTimeout(() => { spinner.classList.add("d-none"); }, 200);
                    } else if (scriptRequest.readyState == 4 && scriptRequest.status != 200) {
                        console.error("Script at (" + routes[route].script + ") is 404 not found.");
                    }
                };
                scriptRequest.send();
            } else {
                setTimeout(() => { spinner.classList.add("d-none"); }, 200);
            }
            document.title = routes[route].title + " - Sistema Manutenzione";
            try {
                bootstrap.Offcanvas.getInstance(document.querySelector('#offcanvas_menu')).hide();
            } catch (e) {
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