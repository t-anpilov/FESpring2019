const container = document.getElementById('menus');
var menus_array = [];

function fill() {
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

