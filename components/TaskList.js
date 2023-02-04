import { Component } from "../common/Component";
import { Task } from "./Task";
import { StorageAPI } from "../data/StorageAPI";

export class TaskList extends Component {
  constructor(parent, className, removeTask, editTask, doneTask, title) {
    super(parent, "div", className);
    const elementList = new Component(this.node, "ul", "task-list", title);
    const storage = new StorageAPI();
    const tasks = storage.loadJSON("tasks");
    if (tasks.length) {
      tasks.forEach(
        (task) =>
          new Task(elementList.node, task, removeTask, editTask, doneTask)
      );
    } else {
      new Component(elementList.node, "p", "message", "There is no Tasks.");
    }
  }
}
