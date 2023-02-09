import { Component } from "./common/Component";
import { Form } from "./components/Form";
import { TaskList } from "./components/TaskList";
import { DoneTaskList } from "./components/DoneTaskList";
import { StorageAPI } from "./data/StorageAPI";
import { Task } from "./components/Task";
import { DoneTask } from "./components/DoneTask";
import { animateEnter } from "./common/utils";
import { Toast } from "./components/Toast";

export class App extends Component {
  constructor(parent) {
    super(parent, "div", "app");
    this.taskState = new StorageAPI("tasks");
    this.doneState = new StorageAPI("done-tasks");

    this.form = new Form(this.node, this.add.bind(this));
    this.main = new Component(this.node, "main", "main");
    this.taskList = new TaskList(
      null,
      "task-list-wrapper",
      this.taskState,
      this.remove.bind(this),
      this.edit.bind(this),
      this.done.bind(this)
    );
    this.main.node.insertAdjacentElement("afterbegin", this.taskList.node);

    this.doneTaskList = new DoneTaskList(
      null,
      "done-tasks-wrapper",
      this.doneState,
      this.removeDoneTask.bind(this),
      this.restore.bind(this),
      `<h2 class="done-list-title">Done</h2>`
    );
    this.main.node.insertAdjacentElement("beforeend", this.doneTaskList.node);
  }

  add(task) {
    this.taskState.joinJSON(task);
    animateEnter(
      new Task(
        this.taskList.list.node,
        task,
        this.remove.bind(this),
        this.edit.bind(this),
        this.done.bind(this)
      ).node
    );
  }

  addDone(task) {
    this.doneState.joinJSON(task);
    animateEnter(
      new DoneTask(
        this.doneTaskList.list.node,
        task,
        this.removeDoneTask.bind(this),
        this.restore.bind(this)
      ).node
    );
  }

  remove(node, id) {
    this.taskState.updateJSON(id);
    node.remove();
  }

  removeDoneTask(node, id) {
    this.doneState.updateJSON(id);
    node.remove();
  }

  edit(task) {
    this.taskState.editJSON(task);
    this.taskList.destroy();
    this.taskList = new TaskList(
      null,
      "task-list-wrapper",
      this.taskState,
      this.remove.bind(this),
      this.edit.bind(this),
      this.done.bind(this)
    );
    this.main.node.insertAdjacentElement("afterbegin", this.taskList.node);
  }

  done(node, task) {
    const { id } = task;
    this.remove.call(this, node, id);
    this.addDone(task);
    const modal = new Toast(this.node, "Congratulations!");
  }

  restore(node, task) {
    const { id } = task;
    this.removeDoneTask(node, id);
    this.add(task);
  }
}
