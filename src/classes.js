"use strict";

import { toDoList } from "./toDoFunctions";

export default class ToDo {
  static lastKey = 0;
  key;
  constructor(title, dueDate, text) {
    this.title = title;
    this.dueDate = dueDate;
    this.text = text;
    this.done = false;
    this.key = ToDo.lastKey++;
  }

  deleteItem(index) {
    toDoList.splice(index, 1);
  }

  changeStatus(status) {
    this.done = status;
  }
}
