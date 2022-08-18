"use strict";

// Creates DOM elements, adds CSS styles, appends them to DOM, return reference to main to-do item"
export function createToDoElements(toDo) {
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
export function createExpandedToDoElements(toDo) {
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
