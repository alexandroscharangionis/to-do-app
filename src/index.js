"use strict";

import {
  projects,
  toDoList,
  createToDo,
  displayToDo,
  expandClickedItems,
} from "/src/toDoFunctions";
import "../src/style.css";
import { createForm } from "/src/generate_DOM_elements";
import { sortByActive, sortByPriority } from "./sorting";

let currentProject = projects[0];

const newBtn = document.getElementById("createNew");
newBtn.addEventListener("click", createForm);

const projectTitle = document.getElementById("projectTitle");
projectTitle.textContent = currentProject.name;

projectTitle.addEventListener("blur", () => {
  if (projectTitle.textContent === "") {
    projectTitle.textContent = currentProject.name;
  } else {
    currentProject.name = projectTitle.textContent;
    console.log(currentProject.name);
  }
});

const active = document.getElementById("active");
active.addEventListener("click", sortByActive);

const priority = document.getElementById("priority");
priority.addEventListener("click", sortByPriority);
