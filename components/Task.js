import { Component } from "../common/Component";
import { toggleVisible } from "../common/utils";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";

export class Task extends Component {
  constructor(parent, task, removeTask, editTask, doneTask) {
    super(parent, "li", "task");
    const { id, text } = task;
    this.node.setAttribute("data-id", id);

    new Checkbox(this.node, doneTask, id);

    const textWrapper = new Component(this.node, "div", "task-text-wrapper");

    const taskName = new Component(textWrapper.node, "p", "task-text", text);

    const editInput = new Input(textWrapper.node, "task-input hidden", {
      value: text,
    });

    const btnWrapper = new Component(this.node, "div", "btn-wrapper");

    const editBtn = new Button(btnWrapper.node, "edit-btn");

    const saveBtn = new Button(btnWrapper.node, "save-btn");

    const removeBtn = new Button(btnWrapper.node, "remove-btn");

    removeBtn.node.addEventListener("click", () => removeTask(id));

    this.node.addEventListener("click", (e) => {
      if (e.target.className === "edit-btn") {
        toggleVisible(taskName.node, editInput.node, "hide");
        editInput.node.focus();
      }
      if (e.target.className === "save-btn") {
        toggleVisible(taskName.node, editInput.node, "");
        editTask({ id, text: editInput.getValue() });
      }
    });
  }
}
