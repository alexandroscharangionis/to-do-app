"use strict";

import { createToDo, displayToDo } from "./toDoFunctions";
import {
  changeSidebarContentProject,
  createExpandedToDoElements,
} from "./DOM_element_creation";
import { clearNotesGrid } from "./DOM_element_creation";
import {
  currentProject,
  projects,
  openProjectForFormIntake,
  createProject,
  displayProjects,
} from "./projectFunctions";

// Takes input data, creates new object based on data, displays the data
export function intakeFormData(event) {
  event.preventDefault();
  const error = document.getElementById("error");
  const title = document.getElementById("todo__title").value;
  const project = document.getElementById("todo__project").value;
  const date = document.getElementById("todo__date").value;
  const description = document.getElementById("todo__text").value;
  if (title === "" || description === "") {
    error.textContent = "Please fill in every field.";
    return;
  } else if (title.length > 20) {
    error.textContent = "Title shouldn't be longer than 20 characters.";
  } else {
    error.textContent = "";
    const [itemReference, itemObj] = displayToDo(
      createToDo(title, project, date, description)
    );
    openProjectForFormIntake();

    document.getElementById("form").reset();
    notesGrid.removeChild(document.querySelector(".to-do-wrapper"));

    // Event listener that expands the to-do item if clicked to display full description
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

export function createProjectAndOpen(event) {
  event.preventDefault();
  const error = document.getElementById("error");
  const title = document.getElementById("project__title").value;

  if (title === "") {
    error.textContent = "Please choose a title";
    return;
  } else if (title.length > 20) {
    error.textContent = "Title shouldn't be longer than 20 characters.";
  } else {
    error.textContent = "";

    const newProject = createProject(title);
    document.getElementById("form").reset();
    notesGrid.removeChild(document.querySelector(".to-do-wrapper"));
    displayProjects();
  }
}
