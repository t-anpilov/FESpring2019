const searcher = document.getElementById('searcher');
searcher.addEventListener('click', searchPrase);

function searchPrase() {
    let lights = document.getElementsByClassName('light');
    try {
        for (let i=0; i<lights.length; i++) {
            lights[i].classList.remove('light');            
        }
    } catch(e) { console.log(e.message) }
    
    if (document.getElementById('find').value.length > 2) {
        var srchPhr = document.getElementById('find').value;
    }    
    
    let elems = document.body.querySelectorAll('*');
    let simpleElems = [];
        
    for (let i=0; i<elems.length; i++) {
        if ( (elems[i].children.length == 0) && (elems[i].textContent) )  {
            simpleElems.push(elems[i]);
        } 
    }    

    if (srchPhr) {
        let regexp = new RegExp(srchPhr, 'ig');
        for (let i=0; i<simpleElems.length; i++) {            
            var result = simpleElems[i].textContent.match(regexp);
            if (result) {
                simpleElems[i].innerHTML = simpleElems[i].innerHTML.replace(regexp, () => {
                    return '<span class="light">' + result[0] + '</span>'
                });                
            }
        }
    } else { 
        alert('type phrase to search, that consits of more than two symbols');             
    }

    document.getElementById('find').value = '';  
}