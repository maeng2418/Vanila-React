import ObserverPage from "./pages/observer";
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
      <div id="container"></div>
    `;
  }

  // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
  mounted() {
    const { page } = this.state;
    const $container = this.$target.querySelector("#container");

    if (page === "/webComponent") new WebComponentPage($container);
    if (page === "/observer") new ObserverPage($container);
  }

  setEvent() {
    const { $target, state } = this;

    $target.querySelector("#webComponent").addEventListener("click", () => {
      state.page = "/webComponent";
    });

    $target.querySelector("#observer").addEventListener("click", () => {
      state.page = "/observer";
    });
  }
}

export default App;
