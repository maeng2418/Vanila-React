import createStore from "./redux";

// 초기 state의 값을 정의해준다.
const initState = {
  a: 10,
  b: 20,
};

// reducer를 정의하여 store에 넘겨준다.
const reducer = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case "SET_A":
      return { ...state, a: action.payload };
    case "SET_B":
      return { ...state, b: action.payload };
    default:
      return state;
  }
});

export default reducer;
