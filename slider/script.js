var slideId = 1;
var slider = document.getElementsByClassName("slider");
var slides = document.getElementsByClassName("item");
var dots = document.getElementsByClassName("slider-dot");

var sliderConfig = {
    timeInterval: 5000,
    baseImgUrl: 'img/',
    autoRun: true,
    slides: [
        {
            slideImg: 'slide1.jpg',
            SlideTxt: 'Text for slide 1'
        },
        {
            slideImg: 'slide2.jpg',
            SlideTxt: 'Text for slide 2'
        },
        {
            slideImg: 'slide3.jpg',
            SlideTxt: 'Text for slide 3'
        },
        {
            slideImg: 'slide4.jpg',
            SlideTxt: 'Text for slide 4'
        },
        {
            slideImg: 'slide5.jpg',
            SlideTxt: 'Text for slide 5'
        },
        {
            slideImg: 'slide6.jpg',
            SlideTxt: 'Text for slide 6'
        },
    ]
}

setSlides(sliderConfig);

if(sliderConfig.autoRun) {
    autoRun(sliderConfig.timeInterval);
} else {
    showSlides(slideId);
}


function nextSlide() {
    showSlides(slideId += 1);
}

function prevSlide() {
    showSlides(slideId -= 1);  
}

function currentSlide(slideNum) {
    showSlides(slideId = slideNum);
}

function autoRun(time) {
    setInterval(function() {
        nextSlide();
    }, time)
}

function generateSlide(slideOptions) {
    if(slideOptions) {
        var slideWrap = document.createElement('div');
        slideWrap.classList.add('item');
        var slideTextTpl = "<div class='slide-text'>" + slideOptions.SlideTxt + "</div>";
        var slideImgTpl = "<img src='" + sliderConfig.baseImgUrl + slideOptions.slideImg + "' alt='" + slideOptions.SlideTxt + "'>";
        slideWrap.innerHTML = slideImgTpl;
        slideWrap.innerHTML += slideTextTpl;
        slider[0].appendChild(slideWrap);
        debugger;
    }
}

function setSlides(config) {
    if(config && config.slides) {
        var optionsL = config.slides.length;
        for(var i = 0; i < optionsL; i++) {
            generateSlide(config.slides[i]);
        }
    }
}

function showSlides(n) {
    var i;    

    if (n > slides.length) {
        slideId = 1
    }
    if (n < 1) {
        slideId = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideId - 1].style.display = "block";
    dots[slideId - 1].className += " active";
}