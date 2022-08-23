"use strict";
import ToDo from "/src/classes";
import "../src/style.css";
import {
  createToDoElements,
  createExpandedToDoElements,
} from "/src/generate_DOM_elements";

const notesGrid = document.getElementById("notesGrid");
export const toDoList = [];
export const projects = [{ name: "My Project" }];

// Creates new object instance, pushes it into array, returns reference to object
export function createToDo(title, dueDate, text) {
  const toDo = new ToDo(title, dueDate, text);
  toDoList.push(toDo);
  return toDo;
}

// Generates HTML & CSS for each element, adds event listeners for 'delete' and 'done', returns reference to displayed item and object
export function displayToDo(toDo) {
  const [toDoItem, delBtn, doneBtn] = createToDoElements(toDo);
  delBtn.addEventListener("click", () => {
    // Removes item from display
    notesGrid.removeChild(toDoItem);
    // Removes item from array also
    toDo.deleteItem(toDo);
  });

  doneBtn.addEventListener("click", () => {
    toDoItem.classList.toggle("notes__grid--item-inactive");
    doneBtn.classList.toggle("doneBtn__clicked");

    // Toggle button text content and toDo 'done' property
    if (doneBtn.textContent === "done?") {
      doneBtn.textContent = "done!";
      toDo.changeStatus(true);
    } else {
      doneBtn.textContent = "done?";
      toDo.changeStatus(false);
    }
  });
  return [toDoItem, toDo];
}
