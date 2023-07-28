document.addEventListener("DOMContentLoaded", switcher, false);
window.addEventListener("hashchange", switcher, false);
window.addEventListener("load", switcher, false);

function switcher() {

    let navbar = document.getElementById("menu_navbar");
    let offcanvas = document.getElementById("menu_offcanvas");
    let footerAccount = document.getElementById("menu_footer_account");
    let footerManagement = document.getElementById("menu_footer_management");

    navbar.innerHTML = '';
    offcanvas.innerHTML = '';
    footerAccount.innerHTML = '';
    footerManagement.innerHTML = '';

    let dashboardSidebar = null;
    try {
        dashboardSidebar = document.getElementById("dashboard_sidebar");
        dashboardSidebar.innerHTML = '';
    } catch (e) {
        console.log("Dashboard sidebar is not loaded.");
    }

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
    function sidebar_item_template(route) {
        return '<a class="btn btn-light shadow" href="#' + route + '" route-id="' + routes[route].id + '" role="button">' + routes[route].title + '</a>'
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
        if (routes[route].menu.includes('dashboard_sidebar')) {
            if (dashboardSidebar != null) {
                dashboardSidebar.innerHTML += sidebar_item_template(route);
            }
        }
    }

    let fullLoaction = window.location.hash.substring(1);

    //select page between ? and #
    let page = fullLoaction.split('?')[0].split('#')[0];

    //select anchor after #
    let anchor = fullLoaction.split('#')[1];

    //select parameters after ?
    let parameters = "?" + fullLoaction.split('?')[1];

    if (fullLoaction.split('?')[1] == undefined) parameters = '';

    if (page == '') {
        window.location.href = '#/';
        return;
    }

    //alert("Switching to page: " + page);
    //alert("Parameters: " + parameters);
    //alert("Anchor: " + anchor);

    if (routes[page] == undefined) {
        if (aliases[page] != undefined) {
            console.log("Route (" + page + ") is an alias. Redirecting to: " + aliases[page]);
            window.location.href = '#' + aliases[page];
            return;
        }
        console.log("Route (" + page + ") doesn't point to any page. Loading 404 page.")
        loadPage('/404', parameters);
        return;
    } else {
        loadPage(page, parameters, anchor);
    }


}

function loadPage(route, parameters, anchor = undefined) {

    sessionStorage.setItem("lastRoute", routes[route].id);

    if (route == undefined) {
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
        // if(routes[route].page.startsWith('#')){
        //     window.location.href = routes[route].page;
        //     return;
        // } Not needed anymore
        window.location.replace(routes[route].page);
        return;
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

                let isArray = Array.isArray(routes[route].script);
                let scriptArray = [];

                if (isArray) {
                    routes[route].script.forEach(function (script) {
                        scriptArray.push(script);
                    });
                } else {
                    scriptArray.push(routes[route].script);
                }

                scriptArray.forEach(function (script) {
                    let scriptRequest = new XMLHttpRequest();
                    scriptRequest.open("GET", script, true);
                    scriptRequest.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0'); // No caching
                    scriptRequest.setRequestHeader('Pragma', 'no-cache'); // No caching
                    scriptRequest.setRequestHeader('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT'); // Cache instantly expires
                    console.log("Requested script at: " + script);
                    scriptRequest.onreadystatechange = function () {
                        if (scriptRequest.readyState == 4 && scriptRequest.status == 200) {
                            console.log("Script at (" + script + ") loaded successfully.");
                            eval(scriptRequest.responseText);
                            setTimeout(() => { spinner.classList.add("d-none"); }, 200);
                            scrollToAnchor(anchor);
                        } else if (scriptRequest.readyState == 4 && scriptRequest.status != 200) {
                            console.error("Script at (" + script + ") is 404 not found.");
                        }
                    };
                    scriptRequest.send();
                });
            } else {
                setTimeout(() => { spinner.classList.add("d-none"); }, 200);
                scrollToAnchor(anchor);
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

}

function scrollToAnchor(anchor) {
    if (anchor != undefined && anchor != '' && anchor != null) {
        let anchorElement = document.querySelector('[anchor-id="' + anchor + '"]');
        if (anchorElement != undefined) {
            anchorElement.scrollIntoView();
        }
    }else{
        window.scrollTo(0, 0);
    }
}