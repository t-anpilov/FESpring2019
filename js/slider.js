const container = document.getElementsByClassName('slider')[0];
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const arrow = document.getElementById('arrow');
const newTop = document.getElementById('line');
const imgArray = [
    '(img/slider/slide-1.jpg)',
    '(img/slider/slide-2.jpg)',
    '(img/slider/slide-3.jpg)',
    '(img/slider/slide-4.jpg)',
    '(img/slider/slide-5.jpg)',
    '(img/slider/slide-5.jpg)',
];

arrow.addEventListener('click', scrollTo);

function scrollTo() {
    var scrollStep = newTop.offsetTop / 30;
    let i = 0;
    scrollInterval = setInterval(()=> {
        if ( i < 30 ) {
            window.scrollBy( 0, scrollStep );
            i++;
        }
        else clearInterval(scrollInterval); 
    }, 15);
}

function sliding() {
    let i = 1;
    setInterval(() => {
        if (i<imgArray.length) {            
            container.style.backgroundImage = 'url' + imgArray[i]; 
            i++;           
        }  else {
            i = 1;
            container.style.backgroundImage = 'url' + imgArray[0];    
        }
    }, 4000);
}

sliding();