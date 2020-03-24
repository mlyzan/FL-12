const list = document.querySelector('#list'),
  allBtn = document.getElementById('all'),
  averageBtn = document.getElementById('average'),
  warningBtn = document.getElementById('warning');

fetch('https://roman4ak.github.io/fe-oop-lab/mocks/epms.json')
  .then(res => res.json())
  .then(json => task(json, employeesStrategy))

class Component {}

class Leaf extends Component {
  constructor(obj, strategy) {
    super()
    this.strategy = strategy;
    this.obj = obj;
  }

  getList() {
    let li = document.createElement('li');
    for (let key in this.obj) {
      if (this.strategy(this.obj)) {
        if (key !== 'id' && key !== 'rm_id' && key !== 'name' && key !== 'last_vacation_date') {
          li.innerHTML += `${key}: ${this.obj[key]}<br>`
        }
        if (key === 'name') {
          li.innerHTML += `<span>${this.obj[key]}</span><br>`
        }
      }
    }
    const childNodesLength = 0;
    if (li.childNodes.length !== childNodesLength) {
      return li
    }
    return ''
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }
}

class Composite extends Component {
  constructor(obj, strategy) {
    super()
    this.children = [];
    this.strategy = strategy;
    this.obj = obj;
  }

  getList() {
    let ul = document.createElement('ul');
    for (let key in this.obj) {
      if (this.strategy(this.obj)) {
        if (key !== 'id' && key !== 'rm_id' && key !== 'name' && key !== 'last_vacation_date') {
          ul.innerHTML += `${key}: ${this.obj[key]}<br>`
        }
        if (key === 'name') {
          ul.innerHTML += `<span class="rm">${this.obj[key]}</span><br>`
        }
      }
    }
    this.children.forEach(child => {
      ul.append(child.getList())
    });
    return ul
  }

  setChild(child) {
    this.children.push(child)
  }

  setStrategy(strategy) {
    this.strategy = strategy;
    this.children.forEach(e => e.setStrategy(strategy))
  }

  resetChild() {
    const initialLength = 0;
    this.children.length = initialLength;
  }
}

function task(data, strategy) {
  const initialParent = 0;
  let tree = new Composite(data[initialParent], strategy);

  function createTree(tree) {
    for (let obj of data) {
      if (tree.obj.id === obj.rm_id) {
        if (!Object.keys(obj).includes('pool_name')) {
          let leaf = new Leaf(obj, strategy);
          tree.setChild(leaf)
        } else if (Object.keys(obj).includes('pool_name')) {
          let composite = new Composite(obj, strategy);
          tree.setChild(composite)
        }
      }
    }

    tree.children.forEach(e => {
      if (e.children) {
        createTree(e)
      }
    })

  }

  createTree(tree);
  list.append(tree.getList());

  function renderTree(strategy) {
    list.innerHTML = '';
    tree.resetChild();
    createTree(tree);
    tree.setStrategy(strategy);
    list.append(tree.getList());
  }

  allBtn.addEventListener('click', () => {
    renderTree(employeesStrategy)
  });

  averageBtn.addEventListener('click', () => {
    renderTree(averageStrategy)
  });

  warningBtn.addEventListener('click', () => {
    renderTree(warningEmployeesStrategy)
  });

}

function averageStrategy(item) {
  if (item.performance === 'average') {
    return true
  }
}

function employeesStrategy(item) {
  if (item.performance === 'low' || item.performance === 'average' || item.performance === 'top') {
    return true
  }
}

function warningEmployeesStrategy(item) {
  if (item.performance === 'low') {
    return true
  }
}