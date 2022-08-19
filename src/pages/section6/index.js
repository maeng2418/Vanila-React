/** @jsx virtualDOM */
const virtualDOM = (type, props, ...children) => {
  return { type, props, children: children.flat() };
};

import Component from "./component";
import createElement from "./virtual-dom";

class VirtualDOMPage extends Component {
  setup() {
    // 상태
    this.state = {
      items: [
        { id: 1, completed: false, content: "todo list item 1" },
        { id: 2, completed: true, content: "todo list item 2" },
      ],
    };
  }

  template() {
    const realDOM = createElement(
      /* VirtualDOM */
      <div id="app">
        <ul>
          {this.state.items.map(({ completed, content }) => (
            <li class={completed ? "completed" : null}>
              <input type="checkbox" class="toggle" checked={completed} />
              {content}
              <button class="remove" disabled>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
    return realDOM;
  }
}

export default VirtualDOMPage;
