$(function () {

    $('.navbar-nav.visible-xs .fa-search').on('click', function () {
        $('.search-dropdown-container').toggleClass('hidden');
        $('.search-toggle').toggleClass('active');
    });

    $('input[type=search]').on('focus', function(){
        // replace CSS font-size with 16px to disable auto zoom on iOS
        $(this).data('fontSize', $(this).css('font-size')).css('font-size', '20px');
    }).on('blur', function(){
            // put back the CSS font-size
            $(this).css('font-size', $(this).data('fontSize'));
        });

});
