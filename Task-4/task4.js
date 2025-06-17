const sections = document.querySelectorAll('section');
    function showSection(id) {
      sections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    // To-Do Logic
    const addBtn = document.getElementById('add-btn');
    const todoInput = document.getElementById('todo-input');
    const todoCategory = document.getElementById('todo-category');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${todo.category}</strong>: ${todo.text}`;
        li.onclick = () => {
          if (confirm("Delete this task?")) {
            todos.splice(index, 1);
            saveTodos();
          }
        };
        todoList.appendChild(li);
      });
    }

    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    }

    addBtn.onclick = () => {
      const text = todoInput.value.trim();
      const category = todoCategory.value;
      if (text) {
        todos.push({ text, category });
        todoInput.value = '';
        saveTodos();
      }
    };
    renderTodos();

    // Products Logic
    const products = [
      { name: "VS Code", type: "tool", rating: 5 },
      { name: "Figma", type: "tool", rating: 4.7 },
      { name: "freeCodeCamp", type: "course", rating: 4.9 },
      { name: "MDN Web Docs", type: "course", rating: 4.8 },
      { name: "React", type: "framework", rating: 4.9 },
      { name: "Tailwind CSS", type: "framework", rating: 4.8 }
    ];

    const filterType = document.getElementById('filter-type');
    const sortSelect = document.getElementById('sort');
    const productList = document.getElementById('product-list');

    function renderProducts() {
      let filtered = products.filter(p => filterType.value === 'all' || p.type === filterType.value);
      if (sortSelect.value === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      productList.innerHTML = filtered.map(p => `
        <div class="product">
          <strong>${p.name}</strong> (${p.type}) - ⭐ ${p.rating}
        </div>
      `).join('');
    }

    filterType.onchange = sortSelect.onchange = renderProducts;
    renderProducts();