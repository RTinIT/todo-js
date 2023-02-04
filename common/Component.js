export class Component {
  node = null;

  constructor(parentNode, tagName = "div", className = "", content = "") {
    const elem = document.createElement(tagName);
    elem.className = className;
    elem.innerHTML = content;
    if (parentNode) {
      parentNode.insertAdjacentElement("beforeend", elem);
    }
    this.node = elem;
  }

  destroy() {
    this.node.remove();
  }
}
