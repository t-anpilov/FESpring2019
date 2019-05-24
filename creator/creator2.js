var menus = {};
var i = 0;

function inputArray() {
    var dish_name, dish_details, price

    dish_name = document.getElementById('name');
    dish_details = document.getElementById('details');
    price = document.getElementById('price');
    if(dish_name.value && dish_details.value && price.value) {
        var obj = {
            'id': i,
            'dish_name': dish_name.value,
            'dish_details': dish_details.value,
            'price': price.value
        };
        menus[i] = obj;
    }
    obj = {};
    dish_name.value = ''
    dish_details.value = ''
    price.value = ''
    i++;
    return menus;        
}

document.getElementById('add').addEventListener('click', inputArray);

document.getElementById('saver').onclick = function() {
    var menuData = JSON.stringify(menus);
    console.log(menuData);
    var csv = menuData;
    var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
    this.href = csvData;
    this.target = '_blank';
    this.download = 'menus.json';
};