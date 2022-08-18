"use strict";

import { toDoList } from "./toDoFunctions";

export default class ToDo {
  static keyCount = 0;
  constructor(title, dueDate, text) {
    this.title = title;
    this.dueDate = dueDate;
    this.text = text;
    this.done = false;
    this.key = ToDo.keyCount++;
  }

  deleteItem(item) {
    toDoList.splice(toDoList.indexOf(item), 1);
  }

  changeStatus(status) {
    this.done = status;
  }
}
