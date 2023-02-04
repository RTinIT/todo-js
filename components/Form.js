import { Component } from "../common/Component";
import { uid } from "../common/utils";

export class Form extends Component {
  constructor(parent, addTask = (it) => it) {
    super(parent, "form", "form", null, "end");

    const input = document.createElement("input");
    this.node.append(input);

    const button = document.createElement("button");
    button.textContent = "ADD TASK";
    this.node.append(button);

    this.node.addEventListener("submit", (e) => {
      e.preventDefault();
      addTask({ id: uid(), text: input.value });
      input.value = "";
    });
  }
}
