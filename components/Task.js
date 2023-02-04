import { Component } from "../common/Component";
import { toggleVisible } from "../common/utils";

export class Task extends Component {
  constructor(parent, { id, text }, removeTask, editTask, doneTask) {
    super(parent, "li", "task");
    this.node.setAttribute("data-id", id);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.onchange = () => {
      doneTask(id);
    };
    this.node.append(checkbox);

    const taskName = document.createElement("p");
    taskName.className = "task-text";
    taskName.textContent = text;

    const editInput = document.createElement("input");
    editInput.setAttribute("value", text);
    editInput.className = "hidden";
    taskName.append(editInput);

    const textWrapper = document.createElement("div");
    textWrapper.append(taskName, editInput);
    this.node.append(textWrapper);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "edit";

    const saveBtn = document.createElement("button");
    saveBtn.className = "save-btn";
    saveBtn.textContent = "save";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "delete";
    removeBtn.addEventListener("click", () => removeTask(id));

    const btnWrapper = document.createElement("div");
    btnWrapper.append(editBtn, saveBtn, removeBtn);
    this.node.append(btnWrapper);

    this.node.addEventListener("click", (e) => {
      if (e.target.className === "edit-btn") {
        toggleVisible(taskName, editInput, "hide");
      }
      if (e.target.className === "save-btn") {
        toggleVisible(taskName, editInput, "");
        editTask({ id, text: editInput.value });
      }
    });
  }
}
