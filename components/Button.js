import { Component } from "../common/Component";

export class Button extends Component {
  constructor(parentNode, className, btnIcon = "", btnName = "") {
    super(parentNode, "button", className);

    if (btnName) {
      this.node.textContent = btnName;
    }

    if (btnIcon) {
      this.node.innerHTML = btnIcon;
    }
  }
}
