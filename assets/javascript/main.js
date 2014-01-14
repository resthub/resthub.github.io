$(function () {

    $('.navbar-nav.visible-xs .fa-search').on('click', function () {
        $('.search-dropdown-container').toggleClass('hidden');
        $('.search-toggle').toggleClass('active');
    });

});
