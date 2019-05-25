var arr = [];

function Table(id) {
    this.id = id;
    this.slots = new Array(6);
    for (var i=0; i<this.slots.length; i++) {
        this.slots[i] = new Array(24);
        for (var j=0; j<this.slots[i].length; j++) {
            this.slots[i][j] = {busy: false};
        }
    };
}

(function() {
    var elems = document.getElementsByClassName('table');    
    for (var i=0; i<elems.length; i++) {
        var table = new Table(i);        
        arr.push(table);
        elems[i].addEventListener('click', changeStatus);
        elems[i].setAttribute('data-id', i);
    }
    console.log(arr);
    return arr;    
})();

function changeStatus(){
    var current = new Date();
    var n = this.getAttribute('data-id'); 
    var begin = document.getElementById('begin_time').value;
    var duration = document.getElementById('timing').value;
    var date = document.getElementById('reserv_date').value;
    var name = document.getElementById('client_mail').value;
    var reqDate = new Date(date + 'T' + begin);
    console.log (current, reqDate);
    if (reqDate-current < 518400000 && reqDate-current > 900000) {
        console.log('can');    
    } else { alert( 'try' ); }
    if (begin && duration && name && date) {
        /*arr[n].busy = true;
        arr[n].timeBegin = begin;
        arr[n].timeEnd = end;
        arr[n].clientName = name;*/
    } else { console.log('error!'); }
    
}


    /*this.src = 'img/table_b.png';
    this.classList.add('busy');
    this.removeEventListener('click', changeStatus);*/