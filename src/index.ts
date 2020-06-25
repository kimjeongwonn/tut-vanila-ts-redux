import { createStore, bindActionCreators } from 'redux';

interface CounterState {
  value: number;
}

const INCREASE = 'COUNT/INCREASE' as const;
const DECREASE = 'COUNT/DECREASE' as const;
const increase = () => ({ type: INCREASE });
const decrease = () => ({ type: DECREASE });

type CounterAction = ReturnType<typeof increase> | ReturnType<typeof decrease>;

const reducer = (state: CounterState = { value: 0 }, action: CounterAction) => {
  console.log(state, action);
  switch (action.type) {
    case INCREASE:
      return { value: ++state.value };
    case DECREASE:
      return { value: --state.value };
    default:
      return state;
  }
};
const store = createStore(reducer);

const addState = () => {
  store.dispatch(increase());
};

const minusState = () => {
  store.dispatch(decrease());
};

document.getElementById('app').innerHTML = `
<h1>Hello Parcel!</h1>
<div>
  <button id="add">ADD</button>
  <span>${store.getState().value}</span>
  <button id="minus">MINUS</button>
</div>
`;
const minusButton = document.querySelector('#minus');
const addButton = document.querySelector('#add');
minusButton.addEventListener('click', minusState);
addButton.addEventListener('click', addState);

store.subscribe(
  () =>
    (document.querySelector('span').innerHTML = String(store.getState().value))
);
