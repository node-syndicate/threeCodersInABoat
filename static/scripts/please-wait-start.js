
const helpers = {
    loadingScreen() {
        window.loading_screen = window.pleaseWait({
            logo: '/static/imgs/logo-news.png',
            backgroundColor: '#dcdfe5',
            loadingHtml: '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>',
        });
        return window.loading_screen;
    },
};
const screen = helpers.loadingScreen();
