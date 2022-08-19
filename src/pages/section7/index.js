/** @jsx virtualDOM */
const virtualDOM = (type, props, ...children) => {
  return { type, props, children: children.flat() };
};

import Component from "./component";

class DiffAlgorithmPage extends Component {
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
    /* VirtualDOM */
    return (
      <div id="app">
        <ul>
          {this.state.items.map(({ completed, content }) => (
            <li class={completed ? "completed" : null}>
              <input type="checkbox" class="toggle" checked={completed} />
              {content}
              <button class="remove">삭제</button>
            </li>
          ))}
        </ul>
        <button class="add">추가</button>
      </div>
    );
  }
}

export default DiffAlgorithmPage;
