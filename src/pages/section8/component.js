import { updateElement } from "./diff-algorithm";

class Component {
  #target;
  #props;
  state;

  constructor(target, props) {
    this.#target = target;
    this.#props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  get $target() {
    return this.#target;
  }

  get props() {
    return this.#props;
  }

  setup() {}
  mounted() {}
  template() {
    return "";
  }
  setEvent() {}
  setState(newState) {
    this.state = { ...newState };
    this.render();
  }
  render() {
    // 기존 Node를 복제한 후에 새로운 템플릿을 채워넣는다.
    const newNode = this.$target.cloneNode(true);
    newNode.innerHTML = this.template();

    // DIFF알고리즘을 적용한다.
    const oldChildNodes = [...this.$target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < max; i++) {
      updateElement(this.$target, newChildNodes[i], oldChildNodes[i]);
    }
    this.mounted(); // render 후에 mounted가 실행 된다.
  }
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐
    // closest를 이용하여 처리한다.
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}

export default Component;
