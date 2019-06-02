const container = document.getElementsByClassName('slider')[0];

const arrow = document.getElementById('arrow');
const newTop = document.getElementById('line');

arrow.addEventListener('click', scrollTo);

function scrollTo() {
    var scrollStep = newTop.offsetTop / 30;
    var i = 0;
    scrollInterval = setInterval(function(){
        if ( i < 30 ) {
            window.scrollBy( 0, scrollStep );
            i++
        }
        else clearInterval(scrollInterval); 
    }, 15);
}