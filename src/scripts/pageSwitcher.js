const routes = {
    '/': {
        'location' : 'components/_home.php',
        'title' : 'Home',
        'type' : 'page'
    },
    '/textEditor': {
        'location' : 'components/_editorTest.php',
        'title' : 'Text Editor',
        'type' : 'page'
    },
    '/bootstrap': {
        'location' : 'components/_bstemp.php',
        'title' : 'Bootstrap',
        'type' : 'page'
    },
    '/404': {
        'location' : 'components/_404.php',
        'title' : 'Errore 404',
        'type' : '404error'
    },
};

window.addEventListener("hashchange", switcher, false);
window.addEventListener("load", switcher, false);

function switcher() {
    let page = window.location.hash.substring(1);
    if (page == '') window.location.href = '#/';

    document.cookie = "page=" + page + "; path=/; sameSite=strict;";

    if (routes[page] == undefined) {
        console.log("Route (" + page + ") doesn't point to any page. Loading 404 page.")
        loadPage(routes['/404'].location, routes['/404'].title, routes['/404'].type);
        return;
    }else{
        loadPage(routes[page].location, routes[page].title, routes[page].type);
    }
}

function loadPage(location, title, type) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", location, true);
    console.log("Requested page at: " + location);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || type == '404error')) {
            console.log("Page at (" + location + ") loaded successfully.")
            document.getElementById("contents").innerHTML = xhr.responseText;
            document.title = title + " - Sistema Manutenzione";
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            console.log("Page at (" + location + ") is 404 not found. Loading 404 page.")
            loadPage(routes['/404'].location, routes['/404'].title, routes['/404'].type);
        }
    };
    xhr.send();
}