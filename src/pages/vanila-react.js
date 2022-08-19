import Component from "../utils/component";

class VanilaReact extends Component {
  initState() {
    return { items: ["item1", "item2"] };
  }
  // setup() {
  //   this.state = { items: ["item1", "item2"] };
  // }
  template() {
    const { items } = this.state;
    return `
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <button>추가</button>
    `;
  }

  setEvent() {
    // button을 클릭할 때 마다 state가 변경되고, 렌더링이 실행된다.
    this.$target.querySelector("button").addEventListener("click", () => {
      const { items } = this.state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }
}

export default VanilaReact;
