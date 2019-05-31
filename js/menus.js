const container = document.getElementById('menus');
const ukr_menus = JSON.parse('{"0":{"id":0,"dish_name":"Ukrainian borsch","dish_details":"with sour cream and porcini mushrooms, 350 g","price":"100"},"1":{"id":1,"dish_name":"Bograch","dish_details":"goulah made Carpathian way, 400 g","price":"140"},"2":{"id":2,"dish_name":"Pampushky","dish_details":"garlic bread puffs, 100 g","price":"20"},"3":{"id":3,"dish_name":"Green borsch","dish_details":"with pork and sour cream, 350 g","price":"90"},"4":{"id":4,"dish_name":"Chicken broth","dish_details":"with noodles, 350 g","price":"80"},"5":{"id":5,"dish_name":"Meat solyanka,","dish_details":"300 g","price":"100"},"6":{"id":6,"dish_name":"Beetroot soup,","dish_details":"320 g","price":"90"},"7":{"id":7,"dish_name":"Fried carp,","dish_details":"100 g","price":"70"},"8":{"id":8,"dish_name":"Crispy pan fried cruisans,","dish_details":"150 g","price":"95"},"9":{"id":9,"dish_name":"Salmon fillet","dish_details":"with lemon-lime souce, 150g","price":"360"},"10":{"id":10,"dish_name":"Dorado fillet","dish_details":"with vegetables, 300 g","price":"380"},"11":{"id":11,"dish_name":"Potato puree,","dish_details":"200 g","price":"50"},"12":{"id":12,"dish_name":"Pan fried potatoes","dish_details":"with onoions, 200 g","price":"55"},"13":{"id":13,"dish_name":"New potato","dish_details":"with greens, 200 g","price":"55"},"14":{"id":14,"dish_name":"Boiled rice","dish_details":"with vegetables, 200 g","price":"60"},"15":{"id":15,"dish_name":"Grilled Vegetables,","dish_details":"200 g","price":"80"},"16":{"id":16,"dish_name":"Buckwheat","dish_details":"with porcini mushrooms, 200 g","price":"75"},"17":{"id":17,"dish_name":"Stewed cabbage,","dish_details":"220 g","price":"60"},"18":{"id":18,"dish_name":"Deruny","dish_details":"(potato pancakes), 200 g","price":"90"},"19":{"id":19,"dish_name":"Homemade pancakes","dish_details":"with meat, 150 g","price":"100"},"20":{"id":20,"dish_name":"Homemade pies","dish_details":"with cabbage, 3pc.","price":"75"},"21":{"id":21,"dish_name":"Homemade pies","dish_details":"with meat, 3pc.","price":"95"},"22":{"id":22,"dish_name":"Whole fried chicken,","dish_details":"450 g","price":"320"},"23":{"id":23,"dish_name":"Veal on a bone","dish_details":"with a tomato souce, 100 g","price":"120"},"24":{"id":24,"dish_name":"Roast pork,","dish_details":"200 g","price":"180"},"25":{"id":25,"dish_name":"Chicken gidlets","dish_details":"with buckwheat, 150 g","price":"120"},"26":{"id":26,"dish_name":"Tender turkey fillet","dish_details":"with vegetables, 250 g","price":"200"},"27":{"id":27,"dish_name":"Rabbit","dish_details":"with vegetables, 250 g","price":"300"},"28":{"id":28,"dish_name":"Goloubutzy","dish_details":"(cabbage leavescroll), 350 g","price":"180"}}');

function fill(menus) {
    var menus_array = [];
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

fill(ukr_menus);