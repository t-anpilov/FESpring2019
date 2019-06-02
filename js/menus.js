const ukr_menus = JSON.parse(localStorage.getItem('ukr_menus'));
const eur_menus = JSON.parse(localStorage.getItem('eur_menus'));
const kids_menus = JSON.parse(localStorage.getItem('kids_menus'));
const drink_menus = JSON.parse(localStorage.getItem('drink_menus'));

function fill(menus, target) {
    const container = document.getElementById(target);
    let menus_array = [];
    for (key in menus) {
        menus_array.push(menus[key]);
    }
    for (let i=0; i<menus_array.length; i++) {
        let menu = document.createElement('div');
        menu.classList.add('menus_item');
        
        let dish = document.createElement('div');
        dish.classList.add('dish');
        
        let name = document.createElement('span');
        name.classList.add('dish_name');
        name.innerHTML = menus_array[i].dish_name + '&nbsp;';
        
        let details = document.createElement('span');
        details.classList.add('dish_details');
        details.innerHTML = menus_array[i].dish_details;

        dish.appendChild(name);
        dish.appendChild(details);

        let price = document.createElement('div');
        price.classList.add('price');
        price.innerHTML = menus_array[i].price + '&nbsp;' + '&#8372;';

        menu.appendChild(dish);
        menu.appendChild(price);
        container.appendChild(menu);
    }    
}

fill(ukr_menus, 'ukr_menus');
fill(eur_menus, 'eur_menus');
fill(kids_menus, 'kids_menus');
fill(drink_menus, 'drink_menus');

var elems = document.getElementsByClassName('menus_block');
var height = 0;

for (let i=0; i<elems.length; i++) {
    if (height < elems[i].offsetHeight) {
        height = elems[i].offsetHeight;
    }
}

var upper = document.getElementsByClassName(' reserv_block')[0];
upper.style.paddingTop = height + 'px';

var radioBtns = document.getElementsByName('menus_select');
for (let i=0; i<radioBtns.length; i++) {
    radioBtns[i].addEventListener('change', () => {
        height = radioBtns[i].nextElementSibling.nextElementSibling.offsetHeight;
        upper.style.paddingTop = height + 'px';
    });
}

var openers = document.getElementsByClassName('opener');
for (let i=0; i<openers.length; i++) {
    openers[i].addEventListener('click', openTab);
}

function openTab(event) {
    let target = event.target;
    if (target.tagName == 'A') {
        var elemId = event.target.dataset.id;
        document.getElementById(elemId).checked = true;        
    }
}