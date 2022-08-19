import Component from "./component";
import store from "./store";

class VuexPage extends Component {
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

export default VuexPage;
