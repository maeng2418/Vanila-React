import Component from "./component";

/**
 * [Real DOM & Diff 알고리즘]
 * - DOM을 메모리상에만 올려놓고 값을 변경하는 작업
 * - 렌더링이 발생하지 않고 메모리에 참조중인 값만 변경하여 VirtualDOM을 사용하는 것과 차이 없음.
 */

class RealDOMDiffAlgorithmPage extends Component {
  setup() {
    // 상태
    this.state = {
      items: [
        { id: 1, completed: false, content: "todo list item 1" },
        { id: 2, completed: true, content: "todo list item 2" },
      ],
    };
  }

  setEvent() {
    this.addEvent("click", ".add", (event) => {
      event.preventDefault();
      this.setState({
        items: [
          ...this.state.items,
          { id: 3, completed: true, content: "todo list item 3 update" },
        ],
      });
    });
  }

  template() {
    return `
        <div id="app">
            <ul>
                ${this.state.items
                  .map(
                    ({ completed, content }) => `
                <li class="${completed ? "completed" : ""}">
                    <input type="checkbox" class="toggle" ${
                      completed ? "checked" : ""
                    } />
                    ${content}
                    <button class="remove">삭제</button>
                </li>
                `
                  )
                  .join("")}
            </ul>
            <button class="add">추가</button>
        </div>
  `.trim();
  }
}

export default RealDOMDiffAlgorithmPage;
