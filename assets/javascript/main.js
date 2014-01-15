$(function () {

    $('.navbar-search').on('click', function () {
        $('.search-form').toggleClass('hidden');
        $('.search-toggle').toggleClass('active');
    });

    $('.collapsible-menu .toggle-menu').on('click', function () {
        $('.collapsible-menu .menu').toggleClass('hidden');
        $('.collapsible-menu .toggle-menu').toggleClass('open');
    });

});
