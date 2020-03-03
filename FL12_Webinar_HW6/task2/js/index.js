
  $.fn.todos = function () {

    const $list = $(".list");
    const $input = $("#add-input");
    const $add = $("#add-submit");
    $list.before(`<input id="search" placeholder="search">`);
    
    function addStyles () {
      $('body').css({'backgroundImage': 'linear-gradient(120deg,#487eb0,#fbc531)', 'minHeight': '100vh'});
      $('.item').css({'background': 'rgba(255,255,255,.5)', 'padding': '10px'});
      $('button').css({'margin': '10px', 'color': '#fff', 'backgroundColor': '#f59b42', 'border': 'none', 'borderRadius': '8px'});
      $('button').hover(function () {
        $(this).css({'cursor': 'pointer', 'opacity': '.7'})
      },function () {
        $(this).css({'cursor': '', 'opacity': ''})
      });
    };
    
    let todos = [];
    todos = JSON.parse(localStorage.getItem('todos'));
    
      function render (arr) {
        $list.empty();
        if(arr) {
          arr.forEach(e => {
            let clazz = e.done ? 'done' : '';
            let block = `
            <li class="item">
            <span class="item-text ${clazz}">${e.text}</span>
            <button class="item-remove">Remove</button>
            </li>
            `;
            $('.list').append(block);
          });
        }
        addStyles();
        
        localStorage.setItem('todos', JSON.stringify(todos));
      }
      render(todos);
    
      function addTask () {
        let inputValue = $input[0].value.trim();
        if(inputValue.length > 1) {
          let obj = {
            text: inputValue,
            done: false
          };
          todos.push(obj);
          $('form')[0].reset()
          render(todos)
        }
      };
      
      function removeTask (index) {
        todos.splice(index,1);
        render(todos)
      };
    
      function showIndex (value) {
        return todos.findIndex(e => e.text === value);
      };
    
      function done (index) {
        todos[index].done = !todos[index].done;
        render(todos)
      }
    
      function search (value) {
            let searchTodos = todos.filter(e => {
              return e.text.indexOf(value) >= 0
            });
        render(searchTodos)
      };
    
    
      $(document).click(function (e) {
        if ($(e.target).attr('id') === 'add-submit') {
          e.preventDefault();
          addTask();
        } if ($(e.target).attr('class') === 'item-text ' || $(e.target).attr('class') === 'item-text done') {
          const textValue = $(e.target).parent().find('.item-text')[0].innerText;
          done(showIndex(textValue));
        } else if ($(e.target).attr('class') === 'item-remove') {
          const textValue = $(e.target).parent().find('.item-text')[0].innerText;
          removeTask(showIndex(textValue))
        }
      });
    
      $('#search').change(function () {
        search(this.value)
      });
      
  };
  
  $(document).todos();