"use strict";
import "../src/style.css";
import { toDoList } from "./toDoFunctions";

export function sortByActive() {
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].done === true) {
      document
        .getElementById(`item${toDoList[i].key}`)
        .classList.toggle("hideInactive");
    }
  }
}
