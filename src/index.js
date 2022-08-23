"use strict";

import {
  toDoList,
  createToDo,
  displayToDo,
  expandClickedItems,
} from "/src/toDoFunctions";
import "../src/style.css";
import { createForm } from "/src/generate_DOM_elements";
import { sortByActive, sortByPriority } from "./sorting";

const newBtn = document.getElementById("createNew");
newBtn.addEventListener("click", createForm);

const projectTitle = document.getElementById("projectTitle");
projectTitle.addEventListener("blur", () => {
  if (projectTitle.textContent === "") {
    projectTitle.textContent = "My project";
  } else {
    // const newTitle = projectTitle.textContent;
    // console.log(newTitle);
  }
});

const active = document.getElementById("active");
active.addEventListener("click", sortByActive);

const priority = document.getElementById("priority");
priority.addEventListener("click", sortByPriority);
