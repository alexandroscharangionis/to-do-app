"use strict";
import { toDoList } from "./toDoFunctions";
import { projects } from "./projectFunctions";

export function saveToLocal() {
  localStorage.setItem("todoList", JSON.stringify(toDoList));
  localStorage.setItem("projectList", JSON.stringify(projects));
}
