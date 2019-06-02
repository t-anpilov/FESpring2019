const dishesPics = [];
var dishesNum = 39;
for (let i=1; i<dishesNum+1; i++) {
    let name = 'img/dishes/' + i + '.jpg';
    dishesPics.push(name);
}
console.log(dishesPics);
const eventPics = [];


function addPics(srcArray, target) {
    const container = document.getElementById(target);
    for (let i=0; i<srcArray.length; i++) {
        let image = document.createElement('img');
        image.classList.add('gallery_item');
        image.setAttribute('src', srcArray[i]);
        container.appendChild(image);
    }
}

addPics(dishesPics, 'dishes_pics');