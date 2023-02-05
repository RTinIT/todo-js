import { Component } from "../common/Component";
import { Title } from "./Title";
import { uid } from "../common/utils";

export class Form extends Component {
  constructor(parent, addTask = (it) => it) {
    super(parent, "form", "form", null, "end");

    const title = new Title(this.node, "TODO");
    const input = document.createElement("input");
    input.setAttribute("placeholder", "Write task ...");
    input.setAttribute("autofocus", "autofocus");
    input.className = "form-input";

    const button = document.createElement("button");
    button.className = "form-btn";
    button.textContent = "ADD TASK";

    this.node.append(input, button);

    this.node.addEventListener("submit", (e) => {
      e.preventDefault();
      addTask({ id: uid(), text: input.value });
      input.value = "";
    });
  }
}
