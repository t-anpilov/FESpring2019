const searcher = document.getElementById('searcher');
searcher.addEventListener('click', searchPrase);

function scrollTo(offset) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: offset
    });
}

function searchPrase() {
    let lights = document.getElementsByClassName('light');
    let searchInputVal = document.getElementById('find').value;
    let trimmedVal = searchInputVal.trim();
    let elems = document.body.querySelectorAll('*');
    let simpleElems = [];

    try {
        for (let i=0; i<lights.length; i++) {
        lights[i].classList.remove('light'); 
    }
    } catch(e) { console.log(e.message) }

    if (trimmedVal.length > 2) {
        var srchPhr = trimmedVal;
    } 

    for (let i=0; i<elems.length; i++) {
        if ( (elems[i].children.length == 0) && (elems[i].textContent) && (elems[i].tagName != 'A')) {
            simpleElems.push(elems[i]);
        } 
    } 

    if (srchPhr) {
        let regexp = new RegExp(srchPhr, 'ig');
        let res = false;
        for (let i=0; i<simpleElems.length; i++) { 
            var result = simpleElems[i].textContent.match(regexp);
            if (result) {
                simpleElems[i].innerHTML = simpleElems[i].innerHTML.replace(regexp, () => {
                return '<span class="light">' + result[0] + '</span>'
            });
            res = true; 
        }
    }
    if (!res) {
        alert('there are no mathes in current search');
    } else {
        let firstItem = document.getElementsByClassName('light')[0];
        if(firstItem) {
            let firstItemOffset = firstItem.offsetTop ? firstItem.offsetTop : 0; 
            if(firstItemOffset >= 0) {
                scrollTo(firstItemOffset);
            }
        }
    }
    } else { 
        alert('type phrase to search, that consits of more than two symbols'); 
    }

    document.getElementById('find').value = ''; 
}