const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

let folderClose = '<i class="material-icons close">folder</i>';
let folderOpen = '<i class="material-icons open">folder_open</i>';
let file = '<i class="material-icons file">insert_drive_file</i>';

// will create DOM structure from array
function createTree(container, arr) {
  container.append(createTreeDom(arr));
}

function createTreeDom(arr) {
  if(!arr){
    return
  }
  let ul = document.createElement('ul');
    ul.classList.add('hide');
  for (let key =0; key< arr.length; key++) {
    let li = document.createElement('li');
    if(arr[key].folder){
      li.innerHTML = `<div class='folder'>${folderClose} ${arr[key].title}</div>`
    }else if(!arr[key].folder && arr[key].title){
      li.innerHTML = `<div>${file} ${arr[key].title}<div>`
    }

    let childrenUl = createTreeDom(arr[key].children);
    if (childrenUl) {
      li.append(childrenUl);
    }
    ul.append(li);
  }

  return ul;
}
createTree(rootNode, structure);

// first ul elemnt will be show and child ul elements will be hide
let firstUl = document.getElementsByTagName('ul')[0];
  firstUl.classList.add('show');


// after click child ul element will be open or closed
let div = rootNode.querySelectorAll('.folder');
for (let i = 0; i < div.length; i++) {
  div[i].addEventListener('click', function(e) {
    e.stopPropagation()
    if(this.querySelector('i').textContent === 'folder'){
      this.parentElement.querySelector('i').innerHTML = 'folder_open';
    }else if(this.querySelector('i').textContent === 'folder_open'){
      this.parentElement.querySelector('i').innerHTML = 'folder';
    }
    if(!this.parentElement.querySelector('ul')){
      let li = document.createElement('li');
      if(!this.parentElement.querySelector('li')){
        li.insertAdjacentHTML('beforeend', `<span>Folder is empty</span>`)
        li.classList.toggle('empty_show')
        this.parentElement.append(li)
      }else{
        this.parentElement.querySelector('li').classList.toggle('hide');
      }
    }else if(this.parentElement.querySelector('ul')){
      this.parentElement.querySelector('ul').classList.toggle('hide');
    }
  });
}
