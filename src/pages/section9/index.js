import Component from "./component";

class VanilaReact extends Component {
  setup() {
    this.state = { items: ["item1", "item2"] };
  }

  template() {
    const { items } = this.state;
    return `
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <button>추가</button>
    `;
  }

  // 아이템 추가 메소드
  addItem = () => {
    const { items } = this.state;
    this.setState({ items: [...items, `item${items.length + 1}`] });
  };

  setEvent() {
    // button을 클릭할 때 마다 state가 변경되고, 렌더링이 실행된다.
    const $addButton = this.$target.querySelector("button");
    $addButton.removeEventListener("click", this.addItem);
    $addButton.addEventListener("click", this.addItem);
  }
}

export default VanilaReact;
