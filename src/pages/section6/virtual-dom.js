/* VirtualDOM을 RealDOM으로 변환하는 과정 */
const createElement = (node) => {
  /* text일 때 */

  if (typeof node === "string") {
    // text node를 만들어서 반환한다.
    return document.createTextNode(node);
  }

  /* tag일 때 */

  // tag에 대한 element를 만든다.
  const $el = document.createElement(node.type);

  // 정의한 속성을 삽입한다.
  Object.entries(node.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => $el.setAttribute(attr, value));

  // node의 children virtual dom을 dom으로 변환한다.
  // 즉, 모든 VirtualDOM을 순회한다.
  const children = node.children.map(createElement);

  // $el에 변환된 children dom을 추가한다.
  children.forEach((child) => $el.appendChild(child));

  // 변환된 dom을 반환한다.
  return $el;
};

export default createElement;
