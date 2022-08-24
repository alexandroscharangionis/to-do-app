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
import { Project } from "./classes";
import { projects, currentProject, createProject } from "./projectsFunctions";

createProject("My Project");
// console.log(projects);
// console.log(currentProject);
// console.log(currentProject.key);

const newBtn = document.getElementById("createNew");
newBtn.addEventListener("click", createForm);

const projectTitle = document.getElementById("projectTitle");
projectTitle.textContent = currentProject.title;

// If user edits current project's title, update it into projects array too (and update currentObject variable so it displays correctly)
projectTitle.addEventListener("blur", () => {
  if (projectTitle.textContent === "") {
    projectTitle.textContent = currentProject.title;
  } else {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].key === currentProject.key) {
        projects[i].title = projectTitle.textContent;
        currentProject = projects[i];
      }
    }
  }
});

const active = document.getElementById("active");
active.addEventListener("click", sortByActive);

const priority = document.getElementById("priority");
priority.addEventListener("click", sortByPriority);
