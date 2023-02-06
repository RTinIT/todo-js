import { Component } from "../common/Component";
import { DoneTask } from "./DoneTask";
import { StorageAPI } from "../data/StorageAPI";

export class DoneTaskList extends Component {
  constructor(parent, className, removeTask, restoreTask, title) {
    super(parent, "div", className);
    const elementList = new Component(this.node, "ul", "task-list", title);
    const storage = new StorageAPI();
    const tasks = storage.loadJSON("done-tasks");
    if (tasks.length) {
      tasks.forEach(
        (task) => new DoneTask(elementList.node, task, removeTask, restoreTask)
      );
    } else {
      new Component(
        elementList.node,
        "p",
        "message",
        "There is no completed tasks."
      );
    }
  }
}
