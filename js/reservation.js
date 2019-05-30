var Tables = {};
Tables.addPlaces = function(){
    var hall = document.getElementsByClassName('tables')[0];
    for (var i=0; i<30; i++){
        var place = document.createElement('div');
        place.classList.add('area');
        hall.appendChild(place);
    }
};
Tables.addTables = function(){
    var places = document.getElementsByClassName('area');
    var id = 0;
    for (var i=0; i<places.length; i++) {
        if ( i<9 || i==12 || i==13 || i==16 || i==17 || (i>21 && i!=26) ) {
            places[i].classList.add('table');
            places[i].dataset.id = id++;
            var text = document.createElement('span');
            text.classList.add('tab_num')
            text.textContent = id;
            places[i].appendChild(text);
        } else {continue}    
    }
};
Tables.addPlaces();
Tables.addTables();

var arr = [];
(function() {
    var elems = document.getElementsByClassName('table');    
    for (var i=0; i<elems.length; i++) {
        var table = new Table(i);        
        arr.push(table);
        elems[i].addEventListener('click', changeStatus);
        elems[i].addEventListener('mouseover', addTitle);
        elems[i].setAttribute('data-id', i);
    }
    document.getElementById('begin_time').addEventListener('change', checkFree);
    document.getElementById('reserv_date').addEventListener('change', checkFree);
    document.getElementById('timing').addEventListener('change', checkFree);
    console.log(arr);
    return arr;    
}());

function Table(id) {
    this.id = id;
    this.slots = new Array(7);
    var today = new Date();
    for (var i=0; i<this.slots.length; i++) {
        this.slots[i] = new Array(24);
        for (var j=0; j<this.slots[i].length; j++) {
            this.slots[i][j] = {};
            this.slots[i][j].busy = false;
            if (j % 2 == 0 || j == 0) {
                this.slots[i][j].from = (11+j/2).toString() + ':' + '00';
                this.slots[i][j].to = (11+j/2).toString() + ':' + '30';
            } else {
                this.slots[i][j].from = (11+(j-1)/2).toString() + ':' + '30';
                this.slots[i][j].to = (11+(j+1)/2).toString() + ':' + '00';
            }
            this.slots[i][j].person = '';
            this.slots[i][j].phone = '';
        }
        var objDay = new Date ( today.getFullYear(), today.getMonth(), today.getDate()+i );
        var day = objDay.getFullYear() + '-' + addZero(objDay.getMonth()+1) + '-' + addZero(objDay.getDate());
        var obj = {};
        obj[day] = this.slots[i];
        this.slots[i] = obj;
    };
}

function changeStatus(){    
    var n = this.getAttribute('data-id'); 
    var begin = document.getElementById('begin_time').value;
    var duration = +document.getElementById('timing').value;
    var date = document.getElementById('reserv_date').value;
    var client_name = document.getElementById('client_name').value;
    var phone = document.getElementById('phone').value;    
    if ( checkDate(date, begin) ) {        
        if (begin && duration && client_name && phone && date) {
            var index;
            var array = arr[n].slots;
            array.forEach(function(elem, i) {
                if (date in elem) index = i;  
            }); 
            if (duration === 1) {
                arr[n].slots[index][date][begin].busy = true;
                arr[n].slots[index][date][begin].person = client_name;
                arr[n].slots[index][date][begin].phone = phone;
            } else {
                try {
                    for (var i=0; i<duration; i++) {    
                        arr[n].slots[index][date][+begin+i].busy = true;
                        arr[n].slots[index][date][+begin+i].person = client_name;
                        arr[n].slots[index][date][+begin+i].phone = phone;
                    }
                } catch(e) {
                    alert( 'Sorry, but restourant will be closed until this time.' );                    
                    return;                      
                }                   
            } 
        this.removeEventListener('click', changeStatus);
        this.src = 'img/table_g.png';    
        var message = (
            'reservated table #' + (+n+1) +
            ' on ' + date +
            ' from ' + arr[n].slots[index][date][begin].from +
            ' to ' + arr[n].slots[index][date][+begin + (duration-1)].to );
        var div = document.createElement('div');
        div.innerHTML = message;
        document.getElementsByClassName('reserv_form')[0].appendChild(div);
        var inputs = document.getElementsByClassName('input_field');
        for (var i=0; i<inputs.length; i++){
            inputs[i].classList.remove('light_it');
            inputs[i].removeAttribute('placeholder');
        }  
        } else {             
            var inputs = document.getElementsByClassName('input_field');
            for (var i=0; i<inputs.length; i++){
                if (!inputs[i].value) { 
                    inputs[i].classList.add('light_it');
                    inputs[i].setAttribute('placeholder', 'enter value');
                }
            }
        } 
    } else {
        document.getElementById('reserv_date').classList.add('light_it'); 
        document.getElementById('reserv_date').setAttribute('placeholder', 'enter value');
        alert( 'try another date' );  
    }        
};

function checkFree() {
    clearPlan();    
    var begin = document.getElementById('begin_time').value;
    var date = document.getElementById('reserv_date').value;
    var duration = +document.getElementById('timing').value;       
    if (checkDate(date, begin) ) { 
        var elems = document.getElementsByClassName('table');    
        for (var i=0; i<elems.length; i++) {
            var index;
            var array = arr[i].slots;
            array.forEach(function(elem, num) {
                if (date in elem) index = num;  
            });
            
            if ((arr[i].slots[index][date][begin].busy === true) && (duration === 1)) {
                changeImg(i);
            } else if (duration > 1) {
                try {
                    for (var j=0; j<duration; j++) {
                        if (arr[i].slots[index][date][+begin+j].busy === true) {
                            changeImg(i);
                        } 
                    }
                }
                catch(e) {
                    alert( 'Sorry, but restourant will be closed until this time.' );
                    for(var i=0; i<elems.length; i++) {
                        changeImg(i);
                    }                    
                    return;
                }
            }
            function changeImg(n) {
                var idStr = 'img[data-id="'+n+'"]';
                var tableBusy = document.querySelector(idStr);
                tableBusy.src = 'img/table_b.png';
                tableBusy.classList.add('busy');
                tableBusy.removeEventListener('click', changeStatus);
            }
        }
    } else {        
        alert ('wrong date');
    }
} 

function clearPlan() {
    var elems = document.getElementsByClassName('table');    
    for (var i=0; i<elems.length; i++) {
        if (elems[i].getAttribute('src') == 'img/table_b.png' || elems[i].getAttribute('src') == 'img/table_g.png') {
            elems[i].setAttribute('src', 'img/table.png');
            elems[i].addEventListener('click', changeStatus);
        }
    }    
}

function addZero(num){
    if(num < 10 && num >= 0) {
        num = '0' + num;
    }
    return num;
}

function addTitle() {
    var begin = document.getElementById('begin_time').value;
    var date = document.getElementById('reserv_date').value;
    if (checkDate(date, begin)) {
        var date = document.getElementById('reserv_date').value;
        var n = this.getAttribute('data-id');
        var srchArr = arr[n].slots;
        for (var i=0; i<srchArr.length; i++) {
            var index;        
            srchArr.forEach(function(elem, num) {
                if (date in elem) index = num;  
            });
        }     
        var obj = srchArr[index];
        var timeArray = obj[date];
        var times = [];
        timeArray.forEach(function(elem) {
            if (elem.busy == true) times.push(elem);  
        });
        var timeStr = '';
        times.forEach(function(elem) {
            timeStr += elem.from + ' - ';
            timeStr += elem.to + ';'; 
        });
        var sumArr = timeStr.split(';');
        var resultArr = [];
        for (var i=0; i<(sumArr.length-1); i++){
            if ( (i === 0) && (sumArr[i].slice(-5) == sumArr[i+1].slice(0, 5)) ) {
                resultArr.push(sumArr[i].slice(0, 8));    
            } else if ( (i === 0) && (sumArr[i].slice(-5) != sumArr[i+1].slice(0, 5)) ) {
                resultArr.push(sumArr[i] + '\n');
            } else if ( (i !== 0) && (sumArr[i].slice(0, 5) == sumArr[i-1].slice(-5)) && (sumArr[i].slice(-5) == sumArr[i+1].slice(0, 5)) ) {
                continue;
            } else if ( (i !== 0) && (sumArr[i].slice(0, 5) == sumArr[i-1].slice(-5)) && (sumArr[i].slice(-5) != sumArr[i+1].slice(0, 5)) ) {
                resultArr.push(sumArr[i].slice(-5) + '\n');
            } else if ( (i !== 0) && (sumArr[i].slice(0, 5) != sumArr[i-1].slice(-5)) && (sumArr[i].slice(-5) == sumArr[i+1].slice(0, 5)) ) {
                resultArr.push(sumArr[i].slice(0, 8));
            } else if ( (i !== 0) && (sumArr[i].slice(0, 5) != sumArr[i-1].slice(-5)) && (sumArr[i].slice(-5) != sumArr[i+1].slice(0, 5)) ) {
                resultArr.push(sumArr[i] + '\n');    
            }      
        }  
        timeStr = resultArr.join('');   
        var text = '';    
        text = 'This day table is busy : \n' + timeStr; 
        if (!times.length) text = 'Free for all day';   
            
        this.title = 'Table #' + this.getAttribute('data-id') + '\n'  + text;
    }    
}

function checkDate(day, from) {
    var current = +(new Date());        
    var reqDate = new Date(day);
    reqDate = +reqDate + (10-2)*60*60*1000 + (from*30*60*1000);   
    if (reqDate-current < (7*24*60*60*1000) && reqDate-current > 15*60*1000 )  {
        return true;
    } 
}