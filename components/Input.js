export class Input {
  node = null;

  constructor(parentNode, className, attrs) {
    const elem = document.createElement("input");
    elem.className = className;

    Object.entries(attrs).forEach(([key, value]) => {
      elem.setAttribute(key, value);
    });

    if (parentNode) {
      parentNode.append(elem);
    }

    this.node = elem;
  }

  destroy() {
    this.node.remove();
  }

  getValue() {
    return this.node.value;
  }

  setValue(value) {
    this.node.value = value;
  }
}
