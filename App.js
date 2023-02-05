import { Component } from "./common/Component";
import { Form } from "./components/Form";
import { TaskList } from "./components/TaskList";
import { DoneTaskList } from "./components/DoneTaskList";
import { StorageAPI } from "./data/StorageAPI";

export class App extends Component {
  constructor(parent) {
    super(parent, "div", "app");
    this.storage = new StorageAPI();

    this.form = new Form(this.node, this.add.bind(this));
    this.main = new Component(this.node, "main", "main");
    this.taskList = null;
    this.doneTaskList = null;
    this.updateTaskList();
    this.updateDoneTaskList();
  }

  add({ id, text }) {
    this.storage.joinJSON("tasks", { id, text });
    this.updateTaskList();
  }

  remove(id) {
    this.storage.updateJSON(id, "tasks");
    this.updateTaskList();
  }

  removeDoneTask(id) {
    this.storage.updateJSON(id, "done-tasks");
    this.updateDoneTaskList();
  }

  edit(task) {
    this.storage.editJSON("tasks", task);
    this.updateTaskList();
  }

  done(id) {
    this.storage.replaceJSON("tasks", "done-tasks", id);
    this.remove.call(this, id);
    this.updateDoneTaskList.call(this);
  }

  restore(task) {
    this.add.call(this, task);
    this.storage.updateJSON(task.id, "done-tasks");
    this.updateDoneTaskList();
  }

  updateTaskList() {
    if (this.taskList) this.taskList.destroy();
    this.taskList = new TaskList(
      null,
      "task-list-wrapper",
      this.remove.bind(this),
      this.edit.bind(this),
      this.done.bind(this)
    );
    this.main.node.insertAdjacentElement("afterbegin", this.taskList.node);
  }

  updateDoneTaskList() {
    if (this.doneTaskList) this.doneTaskList.destroy();
    this.doneTaskList = new DoneTaskList(
      null,
      "done-tasks-wrapper",
      this.removeDoneTask.bind(this),
      this.restore.bind(this),
      `<h2 class="done-list-title">Done</h2>`
    );
    this.main.node.insertAdjacentElement("beforeend", this.doneTaskList.node);
  }
}
