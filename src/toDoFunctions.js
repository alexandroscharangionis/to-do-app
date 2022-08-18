"use strict";
import ToDo from "/src/classes";
import "../src/style.css";
import {
  createToDoElements,
  createExpandedToDoElements,
} from "/src/generate_DOM_elements";

const notesGrid = document.getElementById("notesGrid");
export const toDoList = [];

// Creates new object instances, pushes it into array
export function createToDo(title, dueDate, text) {
  const toDo = new ToDo(title, dueDate, text);
  toDoList.push(toDo);
}

// Generates HTML & CSS for each element, adds event listeners for 'delete' and 'done'
export function displayToDo(toDo) {
  const [toDoItem, delBtn, doneBtn] = createToDoElements(toDo);
  delBtn.addEventListener("click", () => {
    notesGrid.removeChild(toDoItem);
    toDo.deleteItem(toDo.key);
  });

  doneBtn.addEventListener("click", () => {
    toDoItem.classList.toggle("notes__grid--item-inactive");
    doneBtn.classList.toggle("doneBtn__clicked");

    // Toggle button content and toDo 'done' property
    if (doneBtn.textContent === "done?") {
      doneBtn.textContent = "done!";
      toDo.changeStatus(true);
    } else {
      doneBtn.textContent = "done?";
      toDo.changeStatus(false);
    }
  });
}

// Expands selected to-do item
export function expandClickedItems() {
  const allToDos = document.querySelectorAll(".notes__grid--item");
  const toDoArray = Array.from(allToDos);

  toDoArray.forEach((toDo, index) => {
    const item = document.getElementById(`item${index}`);
    item.addEventListener("click", (e) => {
      if (e.target.nodeName.toLowerCase() !== "button") {
        createExpandedToDoElements(toDoList[index]);
        const wrapper = document.querySelector(".to-do-wrapper");
        wrapper.addEventListener("click", () => {
          notesGrid.removeChild(wrapper);
        });
      } else return;
    });
  });
}
