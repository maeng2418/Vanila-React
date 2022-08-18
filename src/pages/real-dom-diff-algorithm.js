function updateElement(parent, newNode, oldNode) {
  // 1. oldNode만 있는 경우
  if (!newNode && oldNode) {
    return oldNode.remove();
  }

  // 2. newNode만 있는 경우
  if (newNode && !oldNode) {
    return parent.appendChild(newNode);
  }

  // 3. oldNode와 newNode 모두 text 타입일 경우
  if (
    // typeof가 아니라 instanceof로 직접 비교한다.
    newNode instanceof Text &&
    oldNode instanceof Text
  ) {
    // Text일 경우 nodeValue로 값 비교가 가능하다.
    if (oldNode.nodeValue === newNode.nodeValue) return;

    // nodeValue의 값을 변경해준다.
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  // 4. oldNode와 newNode의 태그 이름이 다를 경우
  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    return oldNode.remove(), parent.appendChild(newNode, index); // undefined를 반환할 것이다.
  }

  // 5. oldNode와 newNode의 태그 이름(type)이 같을 경우
  // 가상돔(VirtualDOM)의 props를 넘기는게 아니기 때문에 oldNode와 newNode를 직접 넘긴다.
  updateAttributes(oldNode, newNode);

  // 6. newNode와 oldNode의 모든 자식 태그를 순회하며 1 ~ 5의 내용을 반복한다.
  // 일단 childNodes를 배열로 변환해야한다.
  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

function updateAttributes(oldNode, newNode) {
  const oldProps = [...oldNode.attributes];
  const newProps = [...newNode.attributes];

  // 달라지거나 추가된 Props를 반영
  for (const { name, value } of newProps) {
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }

  // 없어진 props를 attribute에서 제거
  for (const { name } of oldProps) {
    if (newNode.getAttribute(name) !== undefined) continue;
    oldNode.removeAttribute(name);
  }
}

const render = (state) => {
  const el = document.createElement("div");
  el.innerHTML = `
    <div id="app">
      <ul>
        ${state
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
      <form>
        <input type="text" />
        <button type="submit">추가</button>
      </form>
    </div>
  `.trim();

  return el.firstChild;
};

const $root = document.createElement("div");

// 이전 상태
const oldState = [
  { id: 1, completed: false, content: "todo list item 1" },
  { id: 2, completed: true, content: "todo list item 2" },
];

// 업데이트 상태
const newState = [
  { id: 1, completed: true, content: "todo list item 1 update" },
  { id: 2, completed: true, content: "todo list item 2" },
  { id: 3, completed: false, content: "todo list item 3" },
];

const oldNode = render(oldState);
const newNode = render(newState);

updateElement($root, oldNode);

setTimeout(() => updateElement($root, newNode, oldNode), 5000); // 1초 뒤에 DOM 변경

export default $root;
