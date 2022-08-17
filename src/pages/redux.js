import { createStore } from "../store";
import Component from "../utils/component";

// 초기 state의 값을 정의해준다.
const initState = {
  a: 10,
  b: 20,
};

// dispatch에서 사용될 type들을 정의해준다.
const SET_A = "SET_A";
const SET_B = "SET_B";

// reducer를 정의하여 store에 넘겨준다.
const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case "SET_A":
      return { ...state, a: action.payload };
    case "SET_B":
      return { ...state, b: action.payload };
    default:
      return state;
  }
});

// reducer에서 사용될 action을 정의해준다.
const setA = (payload) => ({ type: SET_A, payload });
const setB = (payload) => ({ type: SET_B, payload });

class Redux extends Component {
  template() {
    const { a, b } = store.getState();
    return `
      <input id="stateA" value="${a}" size="5" />
      <input id="stateB" value="${b}" size="5" />
      <p>a + b = ${a + b}</p>
    `;
  }

  setEvent() {
    const { $target } = this;

    $target
      .querySelector("#stateA")
      .addEventListener("change", ({ target }) => {
        store.dispatch(setA(Number(target.value)));
      });

    $target
      .querySelector("#stateB")
      .addEventListener("change", ({ target }) => {
        store.dispatch(setB(Number(target.value)));
      });
  }
}

export default Redux;
