import { Component } from "../common/Component";

export class DoneTask extends Component {
  constructor(parent, task, removeTask, restoreTask) {
    super(parent, "li", "task");
    const { id, text } = task;
    this.node.setAttribute("data-id", id);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "checked");
    checkbox.onchange = () => {
      restoreTask(task);
    };
    this.node.append(checkbox);

    const taskName = document.createElement("p");
    taskName.className = "task-text";
    taskName.textContent = text;

    const textWrapper = document.createElement("div");
    textWrapper.append(taskName);
    this.node.append(textWrapper);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "delete";
    removeBtn.addEventListener("click", () => removeTask(id));

    const btnWrapper = document.createElement("div");
    btnWrapper.append(removeBtn);
    this.node.append(btnWrapper);
  }
}
