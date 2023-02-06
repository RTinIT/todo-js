import { Component } from "../common/Component";
import { Title } from "./Title";
import { uid } from "../common/utils";
import { Input } from "./Input";

export class Form extends Component {
  constructor(parent, addTask = (it) => it) {
    super(parent, "form", "form", null, "end");

    const title = new Title(this.node, "TODO");
    const input = new Input(this.node, "form-input", {
      placeholder: "Write task ...",
    });

    const button = document.createElement("button");
    button.className = "form-btn";
    button.textContent = "ADD TASK";

    this.node.append(button);

    this.node.addEventListener("submit", (e) => {
      e.preventDefault();
      addTask({ id: uid(), text: input.getValue() });
      input.setValue("");
    });
  }
}
