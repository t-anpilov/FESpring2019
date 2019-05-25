var arr = [];
(function() {
    var elems = document.getElementsByClassName('table');    
    for (var i=0; i<elems.length; i++) {
        var table = new Table(i);        
        arr.push(table);
        elems[i].addEventListener('click', changeStatus);
        elems[i].setAttribute('data-id', i);
    }
    var btn = document.getElementById('checkTable');
    btn.addEventListener('click', checkFree)
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
                this.slots[i][j].beginTime = (11+j/2).toString() + ':' + '00';
                this.slots[i][j].endTime = (11+j/2).toString() + ':' + '30';
            } else {
                this.slots[i][j].beginTime = (11+(j-1)/2).toString() + ':' + '30';
                this.slots[i][j].endTime = (11+(j+1)/2).toString() + ':' + '00';
            }
            this.slots[i][j].person = '';
        }
        var objDay = new Date ( today.getFullYear(), today.getMonth(), today.getDate()+i );
        var day = objDay.getFullYear() + '-' + addZero(objDay.getMonth()+1) + '-' + addZero(objDay.getDate());
        var obj = {};
        obj[day] = this.slots[i];
        this.slots[i] = obj;
    };
}

function changeStatus(){
    var current = new Date();
    var n = this.getAttribute('data-id'); 
    var begin = document.getElementById('begin_time').value;
    var duration = document.getElementById('timing').value;
    var date = document.getElementById('reserv_date').value;
    var name = document.getElementById('client_mail').value;
    var reqDate = new Date(date);
    //console.log (current, reqDate);
    if (reqDate-current < (7*24*60*60*1000) && reqDate-current > 0  ) {
        console.log('can reserve'); 
        if (begin && duration && name && date) {
            var index;
            var array = arr[n].slots;
            array.forEach(function(elem, i) {
                if (date in elem) index = i;  
            }); 
            if (duration == 1) {
                arr[n].slots[index][date][begin].busy = true;
                arr[n].slots[index][date][begin].person = name;
            } else {
                for (var i=0; i<(+duration); i++) {    
                    arr[n].slots[index][date][+begin+i].busy = true;
                    arr[n].slots[index][date][+begin+i].person = name;
                }   
            }
        console.log(arr[n].slots[index][date]);    
        alert ('reservated table #' + (n+1) + ' from ' + arr[n].slots[index][date][begin].beginTime);
        this.removeEventListener('click', changeStatus);
        this.src = 'img/table_b.png';    
        } else { console.log('fill ol the fields!');      
        } 
    } else { 
        alert( 'try another date' );  
    }    
};

function checkFree(event) {
    event.preventDefault();
    clearPlan();
    var current = new Date();
    var begin = document.getElementById('begin_time').value;
    var date = document.getElementById('reserv_date').value;
    var reqDate = new Date(date);
    if (reqDate-current < (7*24*60*60*1000) && reqDate-current > 0  ) { 
        var elems = document.getElementsByClassName('table');    
        for (var i=0; i<elems.length; i++) {
            var index;
            var array = arr[i].slots;
            array.forEach(function(elem, num) {
                if (date in elem) index = num;  
            }); 
            if (arr[i].slots[index][date][begin].busy === true) {
                var idStr = 'img[data-id="'+i+'"]';
                var tableBusy = document.querySelector(idStr);
                tableBusy.src = 'img/table_b.png';
                tableBusy.classList.add('busy');
                tableBusy.removeEventListener('click', changeStatus);
            } else { continue }
        }
    } else {
        alert ('wrong date');
    }
} 

function clearPlan() {
    var elems = document.getElementsByClassName('table');    
    for (var i=0; i<elems.length; i++) {
        if (elems[i].getAttribute('src') == 'img/table_b.png') {
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