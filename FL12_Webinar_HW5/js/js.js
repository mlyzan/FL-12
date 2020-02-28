addEventListener('DOMContentLoaded', () =>{
    let ul = document.getElementById('list');
    onload = willRender;
    onhashchange = willRender;
    function willRender () {
        if(location.hash.includes('#/comments/')){
            let id = location.hash.match(/[0-9]+/g);
            comments(id)
        }else if(location.hash === '' || location.hash === "#"){
            renderMain()
        }
    };

    function renderMain () {
        
    const getUsers = (function () {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                renderUsers(json)
            })
    }());

    function renderUsers (arr) {
        ul.style.display = 'block';
        document.querySelector('.loader').style.display = 'none';
        if(document.querySelectorAll('.comments span')) {
            document.querySelectorAll('.comments span').forEach(e => e.remove());
        }
        arr.forEach(e => {
            let item = document.createElement('li');
                item.classList.add('item');
            let output = `
                <img class="icon icon_edit" src="./svg/edit.svg" alt="edit">
                <img class="icon icon_delete" src="./svg/delete.svg" alt="delete">
                <img class="icon icon_close" src="./svg/close.svg" alt="close">
                <img class="icon icon_save" src="./svg/save.svg" alt="save">
            `;
                item.innerHTML = output;
                item.style.display = 'block';
                item.querySelector('.icon_edit').style.display = 'inline';
                fetch('https://dog.ceo/api/breeds/image/random')
                    .then(res => res.json())
                    .then(json => {
                        let img = document.createElement('img');
                            img.classList.add('photo')
                            img.alt = 'photo';
                            img.src = json.message;
                            item.prepend(img)
                    })
            let arr = Object.entries(e);
            function renderItem (arr) {
                for(let i in arr){
                    if(typeof(arr[i][1]) !== 'object'){
                        let div = document.createElement('div');
                            if(arr[i][0] === 'name'){
                                div.innerHTML = `<span class="value name">${arr[i][1]}</span>`;
                                item.prepend(div);
                            }else {
                                div.innerHTML = `<span class="key">${arr[i][0]}</span>: <span class="value">${arr[i][1]}</span>`;
                                item.querySelector('.icon_edit').before(div);
                            }
                    }
                    if(arr[i][0] === 'id'){
                        item.id = arr[i][1]
                    }
                }
                return item
            };
            ul.appendChild(renderItem(arr))
        });
    };

    function change (parent) {
        let spanValue = parent.querySelectorAll('.value');
        spanValue.forEach(e => {
            let input = document.createElement('input');
                input.value = e.innerText;
                e.parentNode.replaceChild(input, e.parentNode.querySelector('.value'))
        });
        parent.querySelector('.icon_edit').style.display ='none';
        parent.querySelector('.icon_close').style.display = 'inline';
        parent.querySelector('.icon_save').style.display = 'inline';
        parent.querySelector('.icon_delete').style.display = 'inline';

    }
    function close (parent) {
        let inputValue = parent.querySelectorAll('input');
            inputValue.forEach(e => {
                let span = document.createElement('span');
                    span.classList.add('value');
                    span.innerText = e.value;
                    e.parentNode.replaceChild(span, e);
                    if(span.parentNode.querySelectorAll('span').length === 1) {
                        span.parentNode.querySelector('span').classList.add('name');
                    }

            });
            parent.querySelector('.icon_edit').style.display ='inline';
            parent.querySelector('.icon_close').style.display = 'none';
            parent.querySelector('.icon_save').style.display = 'none';
    }
    function spinner (parent) {
        parent.querySelectorAll('div').forEach(e => e.remove());
        let imgSpinner = document.createElement('img');
            imgSpinner.classList.add('spinner');
            imgSpinner.src = './svg/oval.svg';
            parent.querySelector('.photo').after(imgSpinner);
    }
    function save (parent, id) { 
        let inputs = parent.querySelectorAll('input');
        let newDate = {
            name: inputs[0].value,
            id: inputs[1].value,
            username: inputs[2].value,
            email: inputs[3].value,
            phone: inputs[4].value,
            website: inputs[5].value
        };
        spinner(parent) 
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newDate),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                let div = parent.querySelectorAll('div');
                div.forEach(e => {
                    e.remove()
                });
                parent.querySelector('.photo').after(update(json));
                parent.querySelector('.icon_save').style.display = 'none';
                parent.querySelector('.icon_close').style.display = 'none';
                parent.querySelector('.icon_edit').style.display = 'inline';
                parent.querySelector('.spinner').style.display = 'none';
            }).catch(() => 'Oooops! Somethig wrong')
    }

    function update (props) {
        let span = document.createElement('span');
        let output = `
            <div><span class="value name">${props.name}</span></div>
            <div>
                <span class="key">id: </span>
                <span class="value">${props.id}</span>
            </div>
            <div>
                <span class="key">username: </span>
                <span class="value">${props.username}</span>
            </div>
            <div>
                <span class="key">email: </span>
                <span class="value">${props.email}</span>
            </div>
            <div>
                <span class="key">phone: </span>
                <span class="value">${props.phone}</span>
            </div>
            <div>
                <span class="key">website: </span>
                <span class="value">${props.website}</span>
            </div>
        `;
            span.innerHTML = output;;
            return span
    }

    function deleteUser(parent) {
        let liIndex;
        for(let i=0; i < parent.parentNode.querySelectorAll('.item').length; i++) {
            if(parent.parentNode.querySelectorAll('.item')[i] === parent){
                 liIndex = i;
            }
        }
        fetch(`https://jsonplaceholder.typicode.com/posts/${liIndex}`, {
            method: 'DELETE'
        })
        parent.remove()
    }


    addEventListener('click', function (event) {
        let editBtn = document.querySelectorAll('.icon_edit');
        let closeBtn = document.querySelectorAll('.icon_close');
        let saveBtn = document.querySelectorAll('.icon_save');
        let deleteBtn = document.querySelectorAll('.icon_delete');
        let nameBtn = document.querySelectorAll('.name');

            editBtn.forEach(e => {
                if(event.target === e) {
                    change(e.parentNode)
                }
            });

            closeBtn.forEach(e => {
                if(event.target === e) {
                    close(e.parentNode)
                }
            });

            saveBtn.forEach(e => {
                if(event.target === e) {
                    save(e.parentNode, e.parentNode.id)
                }
            });
            
            
            deleteBtn.forEach(e => {
                if(event.target === e) {
                    deleteUser(e.parentNode)
                }
            });

            nameBtn.forEach(e => {
                if(event.target === e) {
                    let id = e.parentNode.parentNode.id;
                    location.hash = `/comments/${id}`
                }
            });
    })

    };
    function comments (id) {
        document.querySelector('.list').querySelectorAll('.item').forEach(e => e.remove())
        document.querySelector('.loader').style.display = 'block';
        document.querySelector('.comments').style.display = 'block';
        document.querySelector('.comments_title').style.display = 'none';
        document.querySelector('.posts_title').style.display = 'none';
        function createItems (title, body) {
            let span = document.createElement('span');
            let block = `
            <div class="comments__block">
                <div class="block_title">${title}</div>
                <div class="block_body">${body}</div>
             </div>
            `;
            span.innerHTML = block;
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.comments_title').style.display = 'block';
            document.querySelector('.posts_title').style.display = 'block';
            return span
        } 

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(response => response.json())
        .then(json => {
          json.forEach((e) => {
            document.querySelector('.comments_title').after(createItems(e.title, e.body));
          })
        })

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response => response.json())
        .then(json => {
          json.forEach((e) => {
              document.querySelector('.posts_title').after(createItems(e.name, e.body));
          })
        })
    }

    document.querySelector('#home').addEventListener('click', () => {
        location.hash = '';
        document.querySelector('.loader').style.display = 'block';
        document.querySelector('.comments').style.display = 'none';

    });
});