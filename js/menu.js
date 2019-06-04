function manageLeftNav() {
    let content_wrap_offset = document.getElementsByClassName('content_field')[0].offsetTop;
    let nav = document.getElementsByClassName('menu_side')[0] || {};
    window.addEventListener('scroll', function() {
        if (window.scrollY >= content_wrap_offset) {
            nav.classList.add('show_left_menu');
        } else if (window.scrollY <= content_wrap_offset) {
            nav.classList.remove('show_left_menu');
        }
    })
}
manageLeftNav();