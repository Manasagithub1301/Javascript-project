document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addItemButton = document.getElementById('add-item');
    const newItemInput = document.getElementById('new-item');
    const searchInput = document.getElementById('search');
    const deleteInput = document.getElementById('delete')
    
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('todoItems')) || [];
        items.forEach(item => createItemElement(item.text, item.done));
    };

    
    const saveItems = () => {
        const items = [];
        document.querySelectorAll('li').forEach(li => {
            items.push({
                text: li.querySelector('.item-text').textContent,
                done: li.classList.contains('done')
            });
        });
        localStorage.setItem('todoItems', JSON.stringify(items));
    };

    
    const createItemElement = (text, done = false) => {
        const li = document.createElement('li');
        li.classList.toggle('done', done);

        const span = document.createElement('span');
        span.classList.add('item-text');
        span.textContent = text;
        li.appendChild(span);

        
        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 20h16v2H4v-2zm12.293-7.293l-1.293 1.293L9 10l1.293-1.293 1.293 1.293 6-6L20 3l-6 6z"></path></svg>';
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit item:', span.textContent);
            if (newText !== null) {
                span.textContent = newText;
                saveItems();
            }
        });
        li.appendChild(editButton);

        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm1 3v12a2 2 0 002 2h12a2 2 0 002-2V9H4zm12-7h-2V1h-4v1H6v2h12V2z"></path></svg>';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveItems();
        });
        li.appendChild(deleteButton);
        const doneButton = document.createElement('button');
        doneButton.classList.add('done');
        doneButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>';
        doneButton.addEventListener('click', () => {
            li.classList.toggle('done');
            saveItems();
        });
        li.appendChild(doneButton);

        
        const moveUpButton = document.createElement('button');
        moveUpButton.classList.add('move');
        moveUpButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7z"></path></svg>';
        moveUpButton.addEventListener('click', () => {
            if (li.previousElementSibling) {
                todoList.insertBefore(li, li.previousElementSibling);
                saveItems();
            }
        });
        li.appendChild(moveUpButton);

        const moveDownButton = document.createElement('button');
        moveDownButton.classList.add('move');
        moveDownButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"></path></svg>';
        moveDownButton.addEventListener('click', () => {
            if (li.nextElementSibling) {
                todoList.insertBefore(li.nextElementSibling, li);
                saveItems();
            }
        });
        li.appendChild(moveDownButton);

        todoList.appendChild(li);
    };


    addItemButton.addEventListener('click', () => {
        const text = newItemInput.value.trim();
        if (text) {
            createItemElement(text);
            newItemInput.value = '';
            saveItems();
        }
    });


    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll('li').forEach(li => {
            const text = li.querySelector('.item-text').textContent.toLowerCase();
            li.style.display = text.includes(query) ? '' : 'none';
        });
    });

    loadItems();
});