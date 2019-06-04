const container = document.getElementsByClassName('slider')[0];
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const arrow = document.getElementById('arrow');
const newTop = document.getElementById('line');
const imgArray = [
    'url("img/slider/slide-1.jpg")',
    'url("img/slider/slide-2.jpg")',
    'url("img/slider/slide-3.jpg")',
    'url("img/slider/slide-4.jpg")',
    'url("img/slider/slide-5.jpg")',
    'url("img/slider/slide-6.jpg")',
];

arrow.addEventListener('click', scrollScreen);

function scrollScreen() {
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

next.addEventListener('click', changeNext);
function changeNext() {
    let index;
    if (!container.getAttribute('style')) {
        index = 0;
    } else {
        let currentImg = container.getAttribute('style').slice(18, -1);    
        index = imgArray.indexOf(currentImg);
    }
    if (index != 5) {
        container.style.backgroundImage = imgArray[index+1]; 
    } else {
        container.style.backgroundImage = imgArray[0];
    }  
}

prev.addEventListener('click', changePrev);
function changePrev() {
    let index;
    if (!container.getAttribute('style')) {
        index = 0;
    } else {
        let currentImg = container.getAttribute('style').slice(18, -1);    
        index = imgArray.indexOf(currentImg);
    }
    if (index !== 0) {
        container.style.backgroundImage = imgArray[index-1]; 
    } else {
        container.style.backgroundImage = imgArray[5];
    }  
}

function sliding() {    
    setInterval( () => {changeNext()}, 5000);
}

sliding();