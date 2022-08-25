"use strict";

import { toDoList } from "./toDoFunctions";
import { projects } from "./projectFunctions";

export class ToDo {
  static keyCount = 0;
  constructor(title, project, dueDate, text) {
    this.title = title;
    this.dueDate = dueDate;
    this.text = text;
    this.done = false;
    this.key = ToDo.keyCount++;
    this.project = project;
  }

  deleteItem(item) {
    toDoList.splice(toDoList.indexOf(item), 1);
  }

  changeStatus(status) {
    this.done = status;
  }
}

export class Project {
  static keyCount = 0;
  constructor(title) {
    this.title = title;
    this.key = Project.keyCount++;
  }

  deleteItem(item) {
    projects.splice(projects.indexOf(item), 1);
  }
}
