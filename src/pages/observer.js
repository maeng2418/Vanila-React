import { ObserverStore as store } from "../store";
import Component from "../utils/component";

class Observer extends Component {
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
        store.setState({ a: Number(target.value) });
      });

    $target
      .querySelector("#stateB")
      .addEventListener("change", ({ target }) => {
        store.setState({ b: Number(target.value) });
      });
  }
}

export default Observer;
