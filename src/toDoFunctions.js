"use strict";
import { ToDo } from "/src/classes";
import "../src/style.css";
import { createToDoElements } from "/src/DOM_element_creation";

const notesGrid = document.getElementById("notesGrid");
export const toDoList = [];

// Creates new object instance, pushes it into array, returns reference to object
export function createToDo(title, project, dueDate, text) {
  const toDo = new ToDo(title, project, dueDate, text);
  toDoList.push(toDo);
  return toDo;
}

// Generates HTML & CSS for each element, adds event listeners for 'delete' and 'done', returns reference to displayed item and object
export function displayToDo(toDo) {
  const [toDoItem, delBtn, doneBtn] = createToDoElements(toDo);
  if (toDo.done === true) {
    markAsDone(toDo, toDoItem, doneBtn);
  }
  delBtn.addEventListener("click", () => {
    // Removes item from display
    notesGrid.removeChild(toDoItem);
    // Removes item from array also
    toDo.deleteItem(toDo);
  });

  doneBtn.addEventListener("click", () => {
    markAsDone(toDo, toDoItem, doneBtn);
  });
  return [toDoItem, toDo];
}

// Helper functions that marks item as done by changing object property, toggling class and updating text content
function markAsDone(toDo, toDoItem, doneBtn) {
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
}
