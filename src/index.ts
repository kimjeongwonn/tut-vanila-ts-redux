import { createStore, Reducer } from 'redux';

const ADD_TODO = 'ADD_TODO' as const;
const DELETE_TODO = 'DELETE_TODO' as const;

const addTodo = (value: string) => {
  return { type: ADD_TODO, value };
};
const deleteTodo = (value: number) => {
  return { type: DELETE_TODO, value };
};

interface Todos {
  readonly todo: string;
}

type ActionType = ReturnType<typeof addTodo> | ReturnType<typeof deleteTodo>;

const reducer: Reducer<Todos[], ActionType> = (
  state: Todos[] = [],
  action: ActionType
) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ todo: action.value, id: Date.now() }, ...state];
    case DELETE_TODO:
      const newState: Todos[] = [...state];
      newState.splice(action.value, 1);
      return newState;
    default:
      return state;
  }
};
const store = createStore(reducer);

document.getElementById('app')!.innerHTML = `
<h1>todoList</h1>
<div>
<form>
<input type="text" placeholder="todo.."/>
<input type="submit" value="ADD" />
<ul></ul>
</form>
</div>
`;

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const addTodoSubmit = e => {
  e.preventDefault();
  if (input!.value) store.dispatch(addTodo(input!.value));
  input!.value = '';
};

const deleteTodoOnClick = e => {
  const id = e.target.value;
  store.dispatch(deleteTodo(id));
  e.target.removeEventListener('click', deleteTodoOnClick);
};

const renderTodo = () => {
  const todos: Todos[] = store.getState();
  ul!.innerHTML = '';
  todos.forEach((item, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.innerHTML = item.todo;
    btn.innerText = 'X';
    btn.value = String(idx);
    btn.addEventListener('click', deleteTodoOnClick);
    ul!.appendChild(li);
    li!.appendChild(btn);
  });
};

form!.addEventListener('submit', addTodoSubmit);

store.subscribe(renderTodo);
