"use strict";
import ToDo from "/src/classes";
import "../src/style.css";

/* ------------HELPER FUNCTIONS------------------ */
/* ---------------------------------------------- */

// Creates DOM elements, adds CSS styles, appends them to DOM, return reference to main to-do item"
function createToDoElements(toDo) {
  const toDoItem = document.createElement("div");
  const toDoTitle = document.createElement("h3");
  const deadlineBox = document.createElement("div");
  const duePara = document.createElement("p");
  const dueSpan = document.createElement("span");
  const doneBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  toDoItem.classList.add("notes__grid--item", "flex-col");
  toDoItem.setAttribute("id", `item${toDo.key}`);
  toDoTitle.classList.add("notes__grid--item-title");
  duePara.classList.add("notes__grid--item-para");
  doneBtn.classList.add("doneBtn");
  doneBtn.setAttribute("id", `done${toDo.key}`);
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.setAttribute("id", `del${toDo.key}`);

  toDoTitle.textContent = toDo.title;
  duePara.textContent = "Due:";
  dueSpan.textContent = toDo.dueDate;
  doneBtn.innerText = "done?";
  deleteBtn.textContent = "delete";

  notesGrid.appendChild(toDoItem);
  toDoItem.append(toDoTitle, deadlineBox, doneBtn, deleteBtn);
  deadlineBox.append(duePara, dueSpan);
  notesGrid.appendChild(toDoItem);

  return [
    document.getElementById(`item${toDo.key}`),
    document.getElementById(`del${toDo.key}`),
    document.getElementById(`done${toDo.key}`),
  ];
}

// Creates DOM elements, adds CSS styles, appends them to DOM
function createExpandedToDoElements(toDo) {
  const toDoWrapper = document.createElement("div");
  const toDoContent = document.createElement("div");
  const toDoTitle = document.createElement("h3");
  const toDoText = document.createElement("p");

  toDoWrapper.classList.add("to-do-wrapper");
  toDoContent.classList.add("to-do-content", "flex-col");
  toDoTitle.classList.add("notes__grid--item-title");
  toDoTitle.textContent = toDo.title;
  toDoText.textContent = toDo.text;

  toDoWrapper.appendChild(toDoContent);
  toDoContent.append(toDoTitle, toDoText);
  notesGrid.appendChild(toDoWrapper);
}

/* ---------------------------------------------- */
/* ---------------------------------------------- */

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
  delBtn.addEventListener("click", (e) => {
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
