import { Component } from "../common/Component";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";

export class DoneTask extends Component {
  constructor(parent, task, removeTask, restoreTask) {
    super(parent, "li", "task");
    const { id, text } = task;
    this.node.setAttribute("data-id", id);

    const checkbox = new Checkbox(this.node, restoreTask, task, "checked");

    const textWrapper = new Component(this.node, "div", "task-text-wrapper");

    const taskName = new Component(textWrapper.node, "p", "task-text", text);

    const btnWrapper = new Component(this.node, "div", "btn-wrapper");

    const removeBtn = new Button(btnWrapper.node, "remove-btn");
    removeBtn.node.addEventListener("click", () => removeTask(id));
  }
}
