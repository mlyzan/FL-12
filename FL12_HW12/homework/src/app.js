
let root = document.getElementById('root');
let header = root.querySelector('.header');
let listHtml = root.querySelector('.list');
onload = render;
onhashchange = render;
function render() {
    if(location.hash === '' || location.hash === '#' ){
        renderMain()
    }if(location.hash.includes('#/modify/')){
        renderModify(location.hash.match(/[0-9]+/g))
    }if(location.hash === '#/new_set'){
        renderNewSet()
    }
}
let allList = [];

function renderMain() {
    listHtml.innerHTML = '';
    let storageData = JSON.parse(localStorage.getItem('todo'));
    storageData ? allList = storageData : false;
    let addBtn = document.createElement('button');
        addBtn.classList.add('add_btn');
        addBtn.innerText = 'Add new';
        listHtml.append(addBtn);
    let allListLength = 0;
    if(allList.length > allListLength){
        allList.forEach(e => {
            let parent = document.createElement('li');
                parent.classList.add('parent');
                if(e.checked){
                    parent.classList.toggle('done');
                }
                listHtml.append(parent);
            let term = document.createElement('div');
                term.classList.add('term');
                term.innerText = e.term;
                parent.append(term);
            let def = document.createElement('div');
                def.classList.add('def');
                def.innerText = e.def;
                parent.append(def);
            let edit = document.createElement('button');
                edit.classList.add('edit');
                edit.innerText = 'Edit';
                parent.append(edit);
            let done = document.createElement('button');
                done.classList.add('done_btn');
                done.innerText = 'Done';
                parent.append(done);
            let remove = document.createElement('button');
                remove.classList.add('remove');
                remove.innerText = 'Remove';
                parent.append(remove);
        })
    }else if(allList.length === allListLength && location.hash === '' || location.hash === '#'){
        let empty = document.createElement('h2');
            empty.innerText = 'Your list is empty';
            listHtml.append(empty)
    }
}

function renderModify(item) {
    listHtml.innerHTML = '';
    let goBack = document.createElement('button');
        goBack.classList.add('go_back');
        goBack.innerText = 'Go to main';
        listHtml.append(goBack);
    let parent = document.createElement('div');
        parent.classList.add('parent');
        listHtml.append(parent);
    let term = document.createElement('input');
        term.classList.add('term');
        term.value = allList[item].term;
        parent.append(term);
    let def = document.createElement('input');
        def.classList.add('def');
        def.value = allList[item].def;
        parent.append(def);
    let save = document.createElement('button');
        save.classList.add('save');
        save.innerText = 'Save';
        parent.append(save);
    let cancel = document.createElement('button');
        cancel.classList.add('cancel');
        cancel.innerText = 'Cancel';
        parent.append(cancel);
    document.querySelector('.save').addEventListener('click', () => {
        if(term.value && def.value){
            allList[item].term = term.value;
            allList[item].def = def.value;
            localStorage.setItem('todo', JSON.stringify(allList))
            location.hash = '';
        }else{
            if(!term.value){
                term.classList.add('error');
                term.placeholder = 'Enter value';
            }else if(!def.value){
                def.classList.add('error');
                def.placeholder = 'Enter value';
            }
        } 
    })
}

function renderNewSet() {
    listHtml.innerHTML = '';
    let goBack = document.createElement('button');
        goBack.classList.add('go_back');
        goBack.innerText = 'Go to main';
        listHtml.append(goBack);
    let parent = document.createElement('div');
        parent.classList.add('parent');
        listHtml.append(parent);
    let term = document.createElement('input');
        term.classList.add('term');
        parent.append(term);
    let def = document.createElement('input');
        def.classList.add('def');
        parent.append(def);
    let save = document.createElement('button');
        save.classList.add('save');
        save.innerText = 'Save';
        parent.append(save);
    let cancel = document.createElement('button');
        cancel.classList.add('cancel');
        cancel.innerText = 'Cancel';
        parent.append(cancel); 
    document.querySelector('.save').addEventListener('click', () => {
        let termValue = document.querySelector('.term').value;
        let defValue = document.querySelector('.def').value;
        if(termValue && defValue){
            addNew(termValue, defValue)
        }else{
            if(!term.value && !def.value){
                term.placeholder = 'Enter value';
                term.classList.add('error');
                def.classList.add('error');
                def.placeholder = 'Enter value';
            }else if(!term.value){
                term.placeholder = 'Enter value';
                term.classList.add('error');
            }else if(!def.value){
                def.classList.add('error');
                def.placeholder = 'Enter value';
            }
        }   
    });
}
function removeItem(e){
    allList.splice(e,1);
    localStorage.setItem('todo', JSON.stringify(allList))
    renderMain()
}
function addNew(term, def){
    let newItem = {
        term,
        def,
        checked: false
    };
    allList.unshift(newItem)
    localStorage.setItem('todo', JSON.stringify(allList))
    location.hash = '';
}
function done(i) {
    if(!allList[i].checked){
        allList[i].checked = true;
        allList.push(allList[i]);
        allList.splice(i, 1);
        localStorage.setItem('todo', JSON.stringify(allList))
    }else if(allList[i].checked){
        allList[i].checked = false;
        let elem = allList[i];
        allList.splice(i,1);
        allList.unshift(elem)
        localStorage.setItem('todo', JSON.stringify(allList))
    }
    renderMain()
}

document.addEventListener('click', (e) => {
    if(e.target === document.querySelector('.go_back')){
        location.hash = '';     
    }else if(e.target === document.querySelector('.add_btn')){
        location.hash = '/new_set';
    }else if(e.target === document.querySelector('.cancel')){
        location.hash = '';
    }
    let removeBtn = root.querySelectorAll('.remove');
    let editBtn = root.querySelectorAll('.edit');
    let doneBtn = root.querySelectorAll('.done_btn');
    for(let i =0; i< removeBtn.length; i++){
        if(e.target === removeBtn[i]){
            removeItem(i)
        }
    }
    for(let i =0; i< editBtn.length; i++){
        if(e.target === editBtn[i]){
            location.hash = `#/modify/${i}`;
            renderModify(i)
        }
    }
    for(let i = 0; i< doneBtn.length; i++){
        if(e.target === doneBtn[i]){
            done(i)
        }
    }
});
