"use strict";
import "../src/style.css";
import { toDoList, displayToDo } from "./toDoFunctions";
import { clearNotesGrid } from "./DOM_element_creation";

export function sortByActive() {
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].done === true) {
      document
        .getElementById(`item${toDoList[i].key}`)
        .classList.toggle("hideInactive");
    }
  }
}

export function sortByPriority() {
  clearNotesGrid();

  if (document.getElementById("priority").checked) {
    const sortedList = toDoList.slice(0).sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    for (let i = 0; i < sortedList.length; i++) {
      displayToDo(sortedList[i]);
    }
  } else {
    for (let i = 0; i < toDoList.length; i++) {
      displayToDo(toDoList[i]);
    }
  }
}
