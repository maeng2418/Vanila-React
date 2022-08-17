let currentObserver = null;

const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback); // 현재 등록된 callback이 있을 경우 취소한다.
    currentCallback = requestAnimationFrame(callback); // 1프레임 뒤에 실행되도록 한다.
  };
};

export const observe = (fn) => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set(value) {
        // 상태가 변경되어 render를 해야하는데, 만약에 변경된 상태가 이전 상태와 값이 똑같을 경우
        if (_value === value) return; // 숫자, 문자열, null, undefined 등의 원시타입
        if (JSON.stringify(_value) === JSON.stringify(value)) return; // 배열이나 객체의 경우
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};
