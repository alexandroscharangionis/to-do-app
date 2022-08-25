"use strict";
import { Project } from "./classes";
import { createProjectItem } from "./DOM_element_creation";

export const projects = [];
export let currentProject;

export function createProject(title) {
  const project = new Project(title);
  projects.push(project);
  currentProject = project;
  return project;
}

export function displayProjects() {
  const notesGrid = document.getElementById("notesGrid");
  const allItems = document.querySelectorAll(".notes__grid--item");
  allItems.forEach((item) => {
    notesGrid.removeChild(item);
  });

  for (const project in projects) {
    const [projectItem, delBtn] = createProjectItem(project);
    delBtn.addEventListener("click", () => {
      // Removes item from display
      notesGrid.removeChild(projectItem);
      // Removes item from project array also
      project.deleteItem(project);
    });
  }
}
