"use strict";
import ToDo from "/src/classes";
import "../src/style.css";

export const toDoList = [];

export function createToDo(title, dueDate, text) {
  const toDo = new ToDo(title, dueDate, text);
  toDoList.push(toDo);
}

export function displayToDo(toDo) {
  const notesGrid = document.getElementById("notesGrid");
  const toDoItem = document.createElement("div");
  const toDoTitle = document.createElement("h3");
  const deadlineBox = document.createElement("div");
  const duePara = document.createElement("p");
  const dueSpan = document.createElement("span");
  const doneBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  toDoItem.classList.add("notes__grid--item", "flex-col");
  toDoTitle.classList.add("notes__grid--item-title");
  duePara.classList.add("notes__grid--item-para");
  doneBtn.classList.add("doneBtn");
  doneBtn.setAttribute("id", "done");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.setAttribute("id", "delete");

  toDoTitle.textContent = toDo.title;
  duePara.textContent = "Due:";
  dueSpan.textContent = toDo.dueDate;
  doneBtn.textContent = "done";
  deleteBtn.textContent = "delete";

  notesGrid.appendChild(toDoItem);
  toDoItem.append(toDoTitle, deadlineBox, doneBtn, deleteBtn);
  deadlineBox.append(duePara, dueSpan);
  notesGrid.appendChild(toDoItem);
}

export function expandToDo(toDo) {
  const notesGrid = document.getElementById("notesGrid");
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

export function expandClickedItems() {
  const allToDos = document.querySelectorAll(".notes__grid--item");
  const notesGrid = document.getElementById("notesGrid");

  allToDos.forEach((toDo, index) => {
    toDo.setAttribute("id", `${index}`);
    toDo.addEventListener("click", () => {
      // console.log(toDo.getAttribute("id"));
      expandToDo(toDoList[index]);
      const wrapper = document.querySelector(".to-do-wrapper");
      wrapper.addEventListener("click", () => {
        notesGrid.removeChild(wrapper);
      });
    });
  });

  function deleteToDo(toDo) {
    // const deleteBtn = document.ATTRIBUTE_NODE;
  }
}
