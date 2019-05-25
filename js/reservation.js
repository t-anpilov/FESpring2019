var arr = [];

function Table(id) {
    this.id = id;
    this.slots = new Array(6);
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
        var options = {year: 'numeric', month: 'numeric', day: 'numeric'} 
        var day = objDay.toLocaleString('uk-UA', options);
        var obj = {};
        obj[day] = this.slots[i];
        this.slots[i] = obj;
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
        console.log('can reserve');    
    } else { alert( 'try another date' ); }
    if (begin && duration && name && date) {
        arr[n].slots[0]['25.05.2019'][0].busy = true;
        
        console.log(arr);
    } else { console.log('error!'); }
    
}


    /*this.src = 'img/table_b.png';
    this.classList.add('busy');
    this.removeEventListener('click', changeStatus);*/