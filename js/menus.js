const ukr_menus = JSON.parse(localStorage.getItem('ukr_menus'));
const eur_menus = JSON.parse(localStorage.getItem('eur_menus'));
const kids_menus = JSON.parse(localStorage.getItem('kids_menus'));
const drink_menus = JSON.parse(localStorage.getItem('drink_menus'));

const radios = document.getElementsByName('menus_select');

function fill(menus, target) {
    const container = document.getElementById(target);
    let menus_array = [];
    for (key in menus) {
        menus_array.push(menus[key]);
    }
    fillFromArray(container.id, menus_array);
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

var btnName = document.getElementById('sort_name');
var btnPrice = document.getElementById('sort_price');

btnName.addEventListener('click', sortByName);
btnPrice.addEventListener('click', sortByPrice);

function sortByName() {
    let srchId = getId();
    let newArray = [];
    
    setArray(srchId, newArray); 
    newArray.sort(compareName);

    clearMenus(srchId);
    fillFromArray(srchId, newArray);

    btnName.removeEventListener('click', sortByName);
    btnName.addEventListener('click', reverseByName);
    btnName.innerHTML = 'Sort by name &#8593;'
}

function reverseByName() {
    let srchId = getId(); 
    let newArray = [];
    
    setArray(srchId, newArray); 
    newArray.sort(compareName).reverse();

    clearMenus(srchId);
    fillFromArray(srchId, newArray);

    btnName.removeEventListener('click', reverseByName);
    btnName.addEventListener('click', sortByName);
    btnName.innerHTML = 'Sort by name &#8595;' 
}

function sortByPrice() {
    let srchId = getId();  
    let newArray = [];
    
    setArray(srchId, newArray); 
    newArray.sort(compareNum);

    clearMenus(srchId);
    fillFromArray(srchId, newArray);

    btnPrice.removeEventListener('click', sortByPrice);
    btnPrice.addEventListener('click', reverseByPrice);
    btnPrice.innerHTML = 'Sort by price &#8593;'
}

function reverseByPrice() {
    let srchId = getId();  
    let newArray = [];
    
    setArray(srchId, newArray); 
    newArray.sort(compareNum).reverse();

    clearMenus(srchId);
    fillFromArray(srchId, newArray);

    btnPrice.removeEventListener('click', reverseByPrice);
    btnPrice.addEventListener('click', sortByPrice);
    btnPrice.innerHTML = 'Sort by price &#8595;' 
}

function getId() {
    for (let i=0; i<radios.length; i++) {
        if (radios[i].checked ) {
           return radios[i].nextElementSibling.nextElementSibling.id;
        }
    }
}

function setArray(objName, array) {
    let obj = JSON.parse(localStorage.getItem(objName));        
    for (key in obj) {
        array.push(obj[key]);
    }
    return array;
} 

function compareName(data1, data2) {
    if (data1.dish_name.toLowerCase() < data2.dish_name.toLowerCase()) {
        return -1;
    } else if (data1.dish_name.toLowerCase() > data2.dish_name.toLowerCase()) {
        return 1;
    } else {
        return 0;
    }
}

function compareNum(data1, data2) {
   return (+data1.price) - (+data2.price)
}

function clearMenus(id) {
    let elemsContainer = document.getElementById(id);
    while (elemsContainer.children.length != 0) {
        elemsContainer.removeChild(elemsContainer.lastChild);
    }
}

function fillFromArray(id, array) {
    let elemsContainer = document.getElementById(id);
    for (let i=0; i<array.length; i++) {
        let menu = document.createElement('div');
        menu.classList.add('menus_item');
        
        let dish = document.createElement('div');
        dish.classList.add('dish');
        
        let name = document.createElement('span');
        name.classList.add('dish_name');
        name.innerHTML = array[i].dish_name + '&nbsp;';
        
        let details = document.createElement('span');
        details.classList.add('dish_details');
        details.innerHTML = array[i].dish_details;

        dish.appendChild(name);
        dish.appendChild(details);

        let price = document.createElement('div');
        price.classList.add('price');
        price.innerHTML = array[i].price + '&nbsp;' + '&#8372;';

        menu.appendChild(dish);
        menu.appendChild(price);
        elemsContainer.appendChild(menu);
    }    
}