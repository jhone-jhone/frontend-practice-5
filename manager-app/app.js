const form = document.querySelector('#add-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');
const filters = document.querySelector('.filters');
const searchInput = document.querySelector('#search-input');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all';
let keyword = '';
const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));

const render = () => {
  list.innerHTML = '';
  const shown = tasks.filter(t => {
    const matchFilter =
      currentFilter === 'all' ? true :
      currentFilter === 'active' ? !t.done : t.done;
    const matchKeyword = (t.title || '').toLowerCase().includes(keyword.toLowerCase());
    return matchFilter && matchKeyword;
  });
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '没有符合条件的图书';
    list.appendChild(li);
    return;
  }
  shown.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.author ? `${task.title} — ${task.author}` : task.title;
    if (task.done) li.classList.add('done');
    li.addEventListener('click', () => {
      task.done = !task.done;    
      render();
    });
    const del = document.createElement('span');
    del.className = 'del';
    del.textContent = '×';
    del.title = '删除';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t !== task);
      save();
      render();
    });
    li.appendChild(del);
    list.appendChild(li);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (title === '') {
    tip.textContent = '书名不能为空';
    return;
  }
  tasks.push({ title: title, author: author, done: false });
  save();
  tip.textContent = '';
  titleInput.value = '';
  authorInput.value = '';
  keyword = '';
  searchInput.value = '';
  render();
});

filters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  currentFilter = e.target.dataset.filter;  
  render();
});

searchInput.addEventListener('input', () => {
  keyword = searchInput.value.trim();
  render();
});

render();