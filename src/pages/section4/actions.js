// dispatch에서 사용될 type들을 정의해준다.
const SET_A = "SET_A";
const SET_B = "SET_B";

// reducer에서 사용될 action을 정의해준다.
export const setA = (payload) => ({ type: SET_A, payload });
export const setB = (payload) => ({ type: SET_B, payload });
