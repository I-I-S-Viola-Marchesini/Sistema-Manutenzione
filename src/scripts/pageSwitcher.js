const routes = {
    '/': {
        'page' : 'components/_home.php',
        'script' : undefined,
        'title' : 'Home',
        'type' : 'page'
    },
    '/textEditor': {
        'page' : 'components/_editorTest.php',
        'script' : 'scripts/_textEditors.js',
        'title' : 'Text Editor',
        'type' : 'page'
    },
    '/bootstrap': {
        'page' : 'components/_bstemp.php',
        'script' : undefined,
        'title' : 'Bootstrap',
        'type' : 'page'
    },
    '/404': {
        'page' : 'components/_404.php',
        'script' : undefined,
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
        loadPage(routes['/404'].page, routes['/404'].script, routes['/404'].title, routes['/404'].type);
        return;
    }else{
        loadPage(routes[page].page, routes[page].script, routes[page].title, routes[page].type);
    }
}

function loadPage(page, script, title, type) {
    let pageRequest = new XMLHttpRequest();
    pageRequest.open("GET", page, true);
    console.log("Requested page at: " + page);
    pageRequest.onreadystatechange = function () {
        if (pageRequest.readyState == 4 && (pageRequest.status == 200 || type == '404error')) {
            console.log("Page at (" + page + ") loaded successfully.");
            document.getElementById("contents").innerHTML = pageRequest.responseText;
            if (script != undefined) {
                let scriptRequest = new XMLHttpRequest();
                scriptRequest.open("GET", script, true);
                console.log("Requested script at: " + script);
                scriptRequest.onreadystatechange = function () {
                    if (scriptRequest.readyState == 4 && scriptRequest.status == 200) {
                        console.log("Script at (" + script + ") loaded successfully.");
                        eval(scriptRequest.responseText);
                    } else if (scriptRequest.readyState == 4 && scriptRequest.status != 200) {
                        console.error("Script at (" + script + ") is 404 not found.");
                    }
                };
                scriptRequest.send();
            }
            document.title = title + " - Sistema Manutenzione";
            try{
                bootstrap.Offcanvas.getInstance(document.querySelector('#offcanvas_menu')).hide();
            }catch(e){
                console.log("Offcanvas not found. Probably not loaded yet.");
            }
        } else if (pageRequest.readyState == 4 && pageRequest.status != 200) {
            console.log("Page at (" + page + ") is 404 not found. Loading 404 page.")
            loadPage(routes['/404'].page, routes['/404'].script, routes['/404'].title, routes['/404'].type);
        }
    };
    pageRequest.send();
    window.scrollTo(0, 0);
}