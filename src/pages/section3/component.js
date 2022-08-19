import { observable, observe } from "./observer";

class Component {
  #target;
  #props;
  state;

  constructor(target, props) {
    this.#target = target;
    this.#props = props;
    this.setup();
  }

  get $target() {
    return this.#target;
  }

  get props() {
    return this.#props;
  }

  setup() {
    this.state = observable(this.initState()); // state를 관찰한다.
    observe(() => {
      // state가 변경될 경우, 함수가 실행된다.
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }

  setState(newState) {
    this.state = { ...newState };
    this.render();
  }
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  mounted() {}
  setEvent() {}

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
