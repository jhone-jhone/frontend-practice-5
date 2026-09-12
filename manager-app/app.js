const form = document.querySelector('#add-form');
const input = document.querySelector('#task-input');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const searchInput = document.querySelector('#search-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');
const filters = document.querySelector('.filters');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all'; 
const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));

const render = () => {
  list.innerHTML = '';
  const shown = tasks.filter(t =>
    currentFilter === 'all' ? true :
    currentFilter === 'active' ? !t.done : t.done
  );
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '没有符合条件的任务';
    list.appendChild(li);
    return;
  }
  shown.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.done) li.classList.add('done');
    const del = document.createElement('span');
    del.textContent = '删除';
    del.className =  'del';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== tssk.id);
      save();
      render();
    })
    li.addEventListener('click', () => {
      task.done = !task.done;    
      save();
      render();
    });
    list.appendChild(li);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (text === '') {
    tip.textContent = '任务名不能为空';
    return;
  }
  tasks.push({ text: text, read: false });
  books.push({
    title: title,
    author: author
  })
  save();
  tip.textContent = '';
  titleInput.value='';
  authorInput.value='';
  input.value = '';
  render();
});

filters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  currentFilter = e.target.dataset.filter;  
  render();
});

render();