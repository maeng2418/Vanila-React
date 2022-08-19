// 발행 기관
class Pulbisher {
  #state;
  #observers = new Set();

  constructor(state) {
    this.#state = state;
    Object.keys(state).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
  }

  // 내부에 변화가 생김
  update(newState) {
    this.#state = { ...this.#state, ...newState };
    // 구독자에게 알림
    this.notify();
  }

  // 구독자 등록
  register(subscriber) {
    this.#observers.add(subscriber);
  }

  // 구독자에게 알림
  notify() {
    this.#observers.forEach((fn) => fn());
  }
}

export default Pulbisher;
