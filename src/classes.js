"use strict";

export class ToDo {
  static keyCount = JSON.parse(localStorage.getItem("todoCount")) || 0;
  constructor(title, project, dueDate, text) {
    this.title = title;
    this.dueDate = dueDate;
    this.text = text;
    this.done = false;
    this.key = ToDo.keyCount++;
    this.project = project;
  }

  saveCountToLocal() {
    localStorage.setItem("todoCount", JSON.stringify(ToDo.keyCount));
  }
}

export class Project {
  static keyCount = JSON.parse(localStorage.getItem("projectCount")) || 0;
  constructor(title) {
    this.title = title;
    this.key = Project.keyCount++;
  }

  saveCountToLocal() {
    localStorage.setItem("projectCount", JSON.stringify(Project.keyCount));
  }
}
