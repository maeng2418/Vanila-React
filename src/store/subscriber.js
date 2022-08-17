// 구독자
class SubScriber {
  #fn;

  constructor(action) {
    this.#fn = action;
  }

  // 구독
  subscribe(publisher) {
    // 구독자 등록
    publisher.register(this.#fn);
  }
}

export default SubScriber;
