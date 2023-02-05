import { Component } from "../common/Component";

export class DoneTask extends Component {
  constructor(parent, task, removeTask, restoreTask) {
    super(parent, "li", "task");
    const { id, text } = task;
    this.node.setAttribute("data-id", id);

    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = "checkbox-container";

    const checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("checked", "checked");
    checkboxInput.onchange = () => {
      restoreTask(task);
    };

    const checkboxMark = document.createElement("div");
    checkboxMark.className = "checkbox-checkmark";

    checkboxLabel.append(checkboxInput, checkboxMark);

    this.node.append(checkboxLabel);

    // const checkbox = document.createElement("input");
    // checkbox.setAttribute("type", "checkbox");
    // checkbox.setAttribute("checked", "checked");
    // checkbox.onchange = () => {
    //   restoreTask(task);
    // };
    // this.node.append(checkbox);

    const taskName = document.createElement("p");
    taskName.className = "task-text";
    taskName.textContent = text;

    const textWrapper = document.createElement("div");
    textWrapper.className = "task-text-wrapper";
    textWrapper.append(taskName);
    this.node.append(textWrapper);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => removeTask(id));

    const btnWrapper = document.createElement("div");
    btnWrapper.className = "btn-wrapper";
    btnWrapper.append(removeBtn);
    this.node.append(btnWrapper);
  }
}
