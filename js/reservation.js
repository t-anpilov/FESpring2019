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
Tables.elems = document.getElementsByClassName('table');

var TableOccup = {};
TableOccup.fill = function() {
    this.data = [];
    var firstDay = new Date(2019, 0, 1);
    for (var num=0; num<20; num++) {        
        this.data[num] = new Array(365);      
        for (var i=0; i<this.data[num].length; i++) {
            this.data[num][i] = {};
            var objDay = new Date ( firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate()+i );
            var day = objDay.getFullYear() + '-' + addZero(objDay.getMonth()+1) + '-' + addZero(objDay.getDate());            
            this.data[num][i][day] = new Array(24);
            for (var j=0; j<this.data[num][i][day].length; j++) {
                this.data[num][i][day][j] = {};
                this.data[num][i][day][j].busy = false;
                if (j % 2 == 0 || j == 0) {
                    this.data[num][i][day][j].from = (11+j/2).toString() + ':' + '00';
                    this.data[num][i][day][j].to = (11+j/2).toString() + ':' + '30';
                } else {
                    this.data[num][i][day][j].from = (11+(j-1)/2).toString() + ':' + '30';
                    this.data[num][i][day][j].to = (11+(j+1)/2).toString() + ':' + '00';
                }
                this.data[num][i][day][j].person = '';
                this.data[num][i][day][j].phone = '';                
            } 
        };
    } 
    console.log(this);   
}
TableOccup.fill();
   
for (var i=0; i<Tables.elems.length; i++) {        
    Tables.elems[i].addEventListener('click', changeStatus);
    Tables.elems[i].addEventListener('mouseover', addTitle);
}
document.getElementById('begin_time').addEventListener('change', checkFree);
document.getElementById('reserv_date').addEventListener('change', checkFree);
document.getElementById('timing').addEventListener('change', checkFree);

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
            TableOccup.data[n].forEach(function(elem, i) {
                if (date in elem) index = i;  
            }); 
            if (duration === 1) {
                TableOccup.data[n][index][date][begin].busy = true;
                TableOccup.data[n][index][date][begin].person = client_name;
                TableOccup.data[n][index][date][begin].phone = phone;
            } else {
                try {
                    for (var i=0; i<duration; i++) {    
                        TableOccup.data[n][index][date][+begin+i].busy = true;
                        TableOccup.data[n][index][date][+begin+i].person = client_name;
                        TableOccup.data[n][index][date][+begin+i].phone = phone;
                    }
                } catch(e) {
                    alert( 'Sorry, but restourant will be closed until this time.' );                    
                    return;                      
                }                   
            } 
        this.removeEventListener('click', changeStatus);
        this.classList.add('ready'); 

        var delMesg = document.getElementsByClassName('message')[0];
        if (delMesg) delMesg.remove();
       
        var message = (
            'reservated table #' + (+n+1) +
            ' on ' + date +
            ' from ' + TableOccup.data[n][index][date][begin].from +
            ' to ' + TableOccup.data[n][index][date][+begin + (duration-1)].to );
        var div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('message');
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
        for (var i=0; i<Tables.elems.length; i++) {
            var index;
            TableOccup.data[i].forEach(function(elem, num) {
                if (date in elem) index = num;  
            });
            
            if ((TableOccup.data[i][index][date][begin].busy === true) && (duration === 1)) {
                changeImg(i);
            } else if (duration > 1) {
                try {
                    for (var j=0; j<duration; j++) {
                        if (TableOccup.data[i][index][date][+begin+j].busy === true) {
                            changeImg(i);
                        } 
                    }
                }
                catch(e) {
                    alert( 'Sorry, but restourant will be closed until this time.' );
                    for(var i=0; i<Tables.elems.length; i++) {
                        changeImg(i);
                    }                    
                    return;
                }
            }
            function changeImg(n) {
                var idStr = '.area[data-id="'+n+'"]';
                var tableBusy = document.querySelector(idStr);
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
        elems[i].classList.remove('busy');
        elems[i].classList.remove('ready');
        elems[i].addEventListener('click', changeStatus);
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
        var srchArr = TableOccup.data[n];
        for (var i=0; i<srchArr.length; i++) {
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
    if ( reqDate-current > 15*60*1000 )  {
        return true;
    } 
}