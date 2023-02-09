import { Component } from "../common/Component";

export class Toast extends Component {
  constructor(parent, message) {
    super(parent, "div", "toast");
    this.parent = parent;
    this.message = message;
    const img = new Component(this.node, "img", "toast-img");
    const text = new Component(this.node, "span", "toast-text", this.message);
    img.node.setAttribute("src", "../assets/icons8-конфетти-32.png");
    setTimeout(() => this.destroy(), 4000);
  }
}
