const dishesPics = [];
var dishesNum = 39;
for (let i=1; i<dishesNum+1; i++) {
    let name = 'img/dishes/' + i + '.jpg';
    dishesPics.push(name);
}

const eventPics = [];
var eventNum = 25;
for (let i=1; i<eventNum+1; i++) {
    let name = 'img/event/' + i + '.jpg';
    eventPics.push(name);
}

function addPics(srcArray, target, begin, amount) {
    const container = document.getElementById(target);
    for (let i=begin; i<(begin+amount); i++) {
        let image = document.createElement('img');
        image.classList.add('gallery_item');
        image.setAttribute('src', srcArray[i]);
        container.appendChild(image);
    }
}

addPics(dishesPics, 'dishes_pics', 0, 9);
addPics(eventPics, 'event_pics', 0, 9);

const turnThePage = document.getElementsByClassName('pagination');
for (let i=0; i<turnThePage.length; i++) {
    turnThePage[i].addEventListener('click', addNextPics);
}

function addNextPics(event) {
    let target = event.target;
    if (target.tagName == 'BUTTON') {
        let pageName = target.parentElement.parentElement.id;
        let number = +target.value;
        clearPage(pageName);
        if (pageName == 'dishes_pics') {
            addPics(dishesPics, pageName, number, 9);   
        } else {
            addPics(eventPics, pageName, number, 9);
        }
        let btns = target.parentElement.children;
        for (let i=0; i<btns.length; i++) {
            btns[i].classList.remove('active');
        }
        target.classList.add('active');       
    }
}

function clearPage(page) {
    let picsContainer = document.getElementById(page);
    while (picsContainer.children.length !== 1) {
        picsContainer.removeChild(picsContainer.lastChild);
    }
}
