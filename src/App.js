import diffAlgorithm from "./pages/diff-algorithm";
import ObserverPage from "./pages/observer";
import ReduxPage from "./pages/redux";
import virtualDOM from "./pages/virtual-dom";
import VuexPage from "./pages/vuex";
import WebComponentPage from "./pages/web-component";
import Component from "./utils/component";

class App extends Component {
  initState() {
    return {
      page: "/webComponent",
    };
  }

  template() {
    const { page } = this.state;
    return `
      <div id="url">${page}</div>
      <button id="webComponent">웹 컴포넌트 만들기</button>
      <button id="observer">옵져버 상태관리 시스템 만들기</button>
      <button id="vuex">Flux 상태관리 시스템 만들기 (Vuex)</button>
      <button id="redux">Flux 상태관리 시스템 만들기 (Redux)</button>
      <button id="virtualDOM">Virtual DOM 만들기</button>
      <button id="diffAlgorithm">Diff 알고리즘 만들기</button>
      <div id="container"></div>
    `;
  }

  // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
  mounted() {
    const { page } = this.state;
    const $container = this.$target.querySelector("#container");

    if (page === "/webComponent") new WebComponentPage($container);
    if (page === "/observer") new ObserverPage($container);
    if (page === "/vuex") new VuexPage($container);
    if (page === "/redux") new ReduxPage($container);

    if (page === "/virtualDOM") $container.appendChild(virtualDOM);
    if (page === "/diffAlgorithm") $container.appendChild(diffAlgorithm);
  }

  setEvent() {
    const { $target, state } = this;

    $target.querySelector("#webComponent").addEventListener("click", () => {
      state.page = "/webComponent";
    });

    $target.querySelector("#observer").addEventListener("click", () => {
      state.page = "/observer";
    });

    $target.querySelector("#vuex").addEventListener("click", () => {
      state.page = "/vuex";
    });

    $target.querySelector("#redux").addEventListener("click", () => {
      state.page = "/redux";
    });

    $target.querySelector("#virtualDOM").addEventListener("click", () => {
      state.page = "/virtualDOM";
    });

    $target.querySelector("#diffAlgorithm").addEventListener("click", () => {
      state.page = "/diffAlgorithm";
    });
  }
}

export default App;
