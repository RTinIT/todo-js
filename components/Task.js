import { Component } from "../common/Component";
import { toggleVisible } from "../common/utils";

export class Task extends Component {
  constructor(parent, { id, text }, removeTask, editTask, doneTask) {
    super(parent, "li", "task");
    this.node.setAttribute("data-id", id);

    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = "checkbox-container";

    const checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.onchange = () => {
      doneTask(id);
    };

    const checkboxMark = document.createElement("div");
    checkboxMark.className = "checkbox-checkmark";

    checkboxLabel.append(checkboxInput, checkboxMark);

    this.node.append(checkboxLabel);

    const taskName = document.createElement("p");
    taskName.className = "task-text";
    taskName.textContent = text;

    const editInput = document.createElement("input");
    editInput.setAttribute("value", text);
    editInput.className = "task-input";
    editInput.classList.add("hidden");
    taskName.append(editInput);

    const textWrapper = document.createElement("div");
    textWrapper.className = "task-text-wrapper";
    textWrapper.append(taskName, editInput);
    this.node.append(textWrapper);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";

    const saveBtn = document.createElement("button");
    saveBtn.className = "save-btn";

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => removeTask(id));

    const btnWrapper = document.createElement("div");
    btnWrapper.className = "btn-wrapper";
    btnWrapper.append(editBtn, saveBtn, removeBtn);
    this.node.append(btnWrapper);

    this.node.addEventListener("click", (e) => {
      if (e.target.className === "edit-btn") {
        toggleVisible(taskName, editInput, "hide");
        editInput.focus();
      }
      if (e.target.className === "save-btn") {
        toggleVisible(taskName, editInput, "");
        editTask({ id, text: editInput.value });
      }
    });
  }
}
