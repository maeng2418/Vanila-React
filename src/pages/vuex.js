import { Vuex as VuexStore } from "../store";
import Component from "../utils/component";

const store = new VuexStore({
  state: {
    a: 10,
    b: 20,
  },

  // state의 값은 오직 mutations를 통해서 변경할 수 있다.
  mutations: {
    SET_A(state, payload) {
      state.a = payload;
    },

    SET_B(state, payload) {
      state.b = payload;
    },
  },

  // actions도 있으면 좋겠지만.. 딱히 지금 쓸만한 API가 없다.
});

class Vuex extends Component {
  template() {
    const { a, b } = store.state;
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
        store.commit("SET_A", Number(target.value));
      });

    $target
      .querySelector("#stateB")
      .addEventListener("change", ({ target }) => {
        store.commit("SET_B", Number(target.value));
      });
  }
}

export default Vuex;
