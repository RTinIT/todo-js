import { Component } from "../common/Component";
import { Task } from "./Task";

export class TaskList extends Component {
  list;
  itemsCount;

  constructor(parent, className, storage, removeTask, editTask, doneTask) {
    super(parent, "div", className);
    storage.subscribe(this);
    const { state } = storage;
    this.itemsCount = state.current.length;

    this.list = new Component(this.node, "ul", "task-list");
    this.message = new Component(null, "p", "message", "There is no tasks.");

    const tasks = state.current;
    if (this.itemsCount) {
      tasks.forEach(
        (task) => new Task(this.list.node, task, removeTask, editTask, doneTask)
      );
    } else {
      this.list.node.append(this.message.node);
    }
  }

  signal(state) {
    this.itemsCount = state.current.length;
    if (!this.itemsCount) {
      this.list.node.append(this.message.node);
    } else {
      this.message.destroy();
    }
  }
}
