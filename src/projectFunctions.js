"use strict";
import { Project } from "./classes";
import {
  generateNewProjectButton,
  createProjectItem,
  clearNotesGrid,
  createExpandedToDoElements,
  changeSidebarContentAllProjects,
  changeSidebarContentProject,
} from "./DOM_element_creation";
import { displayToDo, toDoList, notesGrid, deleteItem } from "./toDoFunctions";
import { saveToLocal } from "./localStorage_func";

export const projects = JSON.parse(localStorage.getItem("projectList")) || [];
export let currentProject = "";
export const projectTitle = document.getElementById("projectTitle");

// Create new project obj instance, push it to projects array, update currentProject variable and return the new instance
export function createProject(title) {
  const project = new Project(title);
  project.saveCountToLocal();
  projects.push(project);
  currentProject = project;
  saveToLocal();
  return project;
}

// Clear current grid, loop through projects array, create DOM elements for every item, add event listeners for delete button and for opening clicked project
export function displayProjects() {
  clearNotesGrid();
  changeSidebarContentAllProjects();
  for (let i = 0; i < projects.length; i++) {
    const [projectItem, delBtn] = createProjectItem(projects[i]);
    delBtn.addEventListener("click", () => {
      // Removes item from display
      notesGrid.removeChild(projectItem);
      // Removes item from project array also
      deleteItem(projects[i], projects);
    });

    generateNewProjectButton();
    projectItem.addEventListener("click", openProject);
  }
}

// Displays to-do items corresponding to that project
function openProject(event) {
  notesGrid.removeChild(document.getElementById("newProjectBtn"));
  clearNotesGrid();
  // Loops through projects array to find clicked project based on key and set it as currentProject
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].key === Number(event.target.id.slice(7))) {
      currentProject = projects[i];
    }
  }
  changeSidebarContentProject();
  // Loops through toDoList array to find every item that has the clicked project assigned to it, then displays every matching item
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].project === currentProject.title) {
      const [itemReference, itemObj] = displayToDo(toDoList[i]);

      itemReference.addEventListener("click", (e) => {
        if (e.target.nodeName.toLowerCase() !== "button") {
          createExpandedToDoElements(itemObj);
          const wrapper = document.querySelector(".to-do-wrapper");
          wrapper.addEventListener("click", (e) => {
            if (e.target === wrapper) {
              notesGrid.removeChild(wrapper);
            } else return;
          });
        } else return;
      });
    }
  }
}

// Another version of openProject function made for the form intake function
export function openProjectForFormIntake() {
  clearNotesGrid();
  // Loops through projects array to find the chosen project from the form based on title and set it as currentProject
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].title === document.getElementById("todo__project").value) {
      currentProject = projects[i];
    }
  }
  changeSidebarContentProject();
  // Loops through toDoList array to find every item that has the chosen project assigned to it, then displays every matching item
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].project === currentProject.title) {
      const [itemReference, itemObj] = displayToDo(toDoList[i]);

      itemReference.addEventListener("click", (e) => {
        if (e.target.nodeName.toLowerCase() !== "button") {
          createExpandedToDoElements(itemObj);
          const wrapper = document.querySelector(".to-do-wrapper");
          wrapper.addEventListener("click", (e) => {
            if (e.target === wrapper) {
              notesGrid.removeChild(wrapper);
            } else return;
          });
        } else return;
      });
    }
  }
}

// If user edits current project's title, update it into projects array too (and update currentObject variable so it displays correctly)
export function editProjectTitle() {
  if (projectTitle.textContent === "") {
    projectTitle.textContent = currentProject.title;
  } else {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].key === currentProject.key) {
        projects[i].title = projectTitle.textContent;
        currentProject = projects[i];
        const allProjectTitles = document.querySelectorAll(".projectSpan");
        allProjectTitles.forEach((item) => {
          item.textContent = projects[i].title;
        });
      }
    }
  }
}
