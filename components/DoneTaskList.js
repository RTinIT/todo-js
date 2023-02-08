import { Component } from "../common/Component";
import { DoneTask } from "./DoneTask";

export class DoneTaskList extends Component {
  list;
  itemsCount;

  constructor(parent, className, storage, removeTask, restoreTask, title) {
    super(parent, "div", className);

    storage.subscribe(this);
    const { state } = storage;
    this.itemsCount = state.current.length;

    this.list = new Component(this.node, "ul", "task-list", title);
    this.message = new Component(
      null,
      "p",
      "message",
      "There is no completed tasks."
    );

    const tasks = state.current;
    if (this.itemsCount) {
      tasks.forEach(
        (task) => new DoneTask(this.list.node, task, removeTask, restoreTask)
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
