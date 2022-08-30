"use strict";
import { ToDo } from "/src/classes";
import "../src/style.css";
import { createToDoElements, clearNotesGrid } from "/src/DOM_element_creation";
import { saveToLocal } from "./localStorage_func";
import { projects } from "./projectFunctions";

export const notesGrid = document.getElementById("notesGrid");
export const toDoList = JSON.parse(localStorage.getItem("todoList")) || [];

// Creates new object instance, pushes it into array, returns reference to object
export function createToDo(title, project, dueDate, text) {
  const toDo = new ToDo(title, project, dueDate, text);
  toDo.saveCountToLocal();
  toDoList.push(toDo);
  saveToLocal();
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
    deleteItem(toDo, toDoList);
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
    changeStatus(toDo, true);
  } else {
    doneBtn.textContent = "done?";
    changeStatus(toDo, false);
  }
}

export function displayAllTodos() {
  clearNotesGrid();
  for (let i = 0; i < toDoList.length; i++) {
    projects.forEach((project) => {
      // If current todo title matches an existing project, display it. Else, delete it (because it means project no longer exists).
      if (toDoList[i].project === project.title) {
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
      } else {
        deleteItem(toDoList[i], toDoList);
      }
    });
  }
}

export function deleteItem(item, arr) {
  arr.splice(arr.indexOf(item), 1);
  saveToLocal();
}

export function changeStatus(obj, status) {
  obj.done = status;
  saveToLocal();
}
