let currentObserver = null;

// 상태가 연속으로 변경되는 경우 한번만 렌더링 되도록 디바운스 설정
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
  const observerMap = {};

  return new Proxy(obj, {
    get(target, name) {
      observerMap[name] = observerMap[name] || new Set();
      if (currentObserver) observerMap[name].add(currentObserver);
      return target[name];
    },
    set(target, name, value) {
      if (target[name] === value) return true;
      if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;
      target[name] = value;
      observerMap[name].forEach((fn) => fn());
      return true;
    },
  });
};
