const routes = {
    '/': {
        'id': 'home',
        'page': 'components/_home.php',
        'script': undefined,
        'title': 'Home',
        'type': 'page',
        'auth': 'none',
        'menu': []
    },
    '/dashboard': {
        'id': 'dashboard',
        'page': '#/dashboard/anagrafica',
        'script': undefined,
        'title': 'Dashboard',
        'type': 'redirect',
        'auth': 'none',
        'menu': ['navbar', 'offcanvas', 'footer_management']
    },
    '/dashboard/anagrafica': {
        'id': 'anagrafica',
        'page': 'components/dashboard/_dashboard.php?tab=anagrafica',
        'script': ['scripts/dashboard/_dashboard.js', 'scripts/dashboard/_anagrafica.js'],
        'title': 'Anagrafica',
        'type': 'page',
        'auth': 'user',
        'menu': ['navbar', 'offcanvas', 'footer_account', 'dashboard_sidebar']
    },
    '/dashboard/sicurezza': {
        'id': 'sicurezza',
        'page': 'components/dashboard/_dashboard.php?tab=sicurezza',
        'script': ['scripts/dashboard/_dashboard.js', 'scripts/dashboard/_sicurezza.js'],
        'title': 'Sicurezza',
        'type': 'page',
        'auth': 'user',
        'menu': ['navbar', 'offcanvas', 'footer_account', 'dashboard_sidebar']
    },
    '/textEditor': {
        'id': 'textEditor',
        'page': 'components/_editorTest.php',
        'script': 'scripts/_textEditors.js',
        'title': 'Text Editor',
        'type': 'page',
        'auth': 'user',
        'menu': ['navbar']
    },
    '/bootstrap': {
        'id': 'bootstrap',
        'page': 'components/_bstemp.php',
        'script': undefined,
        'title': 'Bootstrap',
        'type': 'page',
        'auth': 'user',
        'menu': ['navbar', 'offcanvas'],
    },
    '/login': {
        'id': 'login',
        'page': 'components/_login.php',
        'script': 'scripts/_login.js',
        'title': 'Login',
        'type': 'page',
        'auth': 'none',
        'menu': ['offcanvas', 'navbar']
    },
    '/404': {
        'id': '404',
        'page': 'components/_404.php',
        'script': 'scripts/_404.js',
        'title': 'Errore 404',
        'type': '404error',
        'auth': 'none',
        'menu': []
    },
    '/docs': {
        'id': 'docs',
        'page': '/docs',
        'script': undefined,
        'title': 'Documentazione',
        'type': 'redirect',
        'auth': 'none',
        'menu': ['navbar', 'offcanvas']
    }
};

const aliases = {
    '/home': '/',
};
