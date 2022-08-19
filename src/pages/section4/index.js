import { setA, setB } from "./actions";
import Component from "./component";
import reducer from "./reducer";

class ReduxPage extends Component {
  template() {
    const { a, b } = reducer.getState();
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
        reducer.dispatch(setA(Number(target.value)));
      });

    $target
      .querySelector("#stateB")
      .addEventListener("change", ({ target }) => {
        reducer.dispatch(setB(Number(target.value)));
      });
  }
}

export default ReduxPage;
