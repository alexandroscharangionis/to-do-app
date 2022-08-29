"use strict";

import "../src/style.css";
import { createForm } from "/src/DOM_element_creation";
import { sortByActive, sortByPriority } from "./sorting";
import {
  currentProject,
  createProject,
  displayProjects,
  projectTitle,
  editProjectTitle,
} from "./projectFunctions";
import { displayAllTodos } from "./toDoFunctions";

createProject("My Project");
projectTitle.textContent = currentProject.title;
const projectsBtn = document.getElementById("projectsBtn");
const allTodosBtn = document.getElementById("allTodosBtn");
const newBtn = document.getElementById("createNew");
const active = document.getElementById("active");
const priority = document.getElementById("priority");

projectsBtn.addEventListener("click", displayProjects);
allTodosBtn.addEventListener("click", displayAllTodos);
newBtn.addEventListener("click", createForm);
projectTitle.addEventListener("blur", editProjectTitle);
active.addEventListener("click", sortByActive);
priority.addEventListener("click", sortByPriority);
