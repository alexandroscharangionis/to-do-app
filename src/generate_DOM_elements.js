"use strict";

import intakeFormData from "./formFunctions";

// Creates DOM elements, adds CSS styles, appends them to DOM, returns reference to main item and it's buttons"
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
  toDoWrapper.setAttribute("id", `wrapper${toDo.title}`);
  toDoContent.classList.add("to-do-content", "flex-col");
  toDoTitle.classList.add("notes__grid--item-title");
  toDoTitle.textContent = toDo.title;
  toDoText.textContent = toDo.text;
  // Adds new line if user pressed "enter"
  toDoText.innerHTML = toDoText.innerHTML.replace(/\n/g, "<br>\n");

  toDoWrapper.appendChild(toDoContent);
  toDoContent.append(toDoTitle, toDoText);
  notesGrid.appendChild(toDoWrapper, toDoContent);
}

// Creates DOM elements, adds CSS styles, appends them to DOM, adds event listener for data intake
export function createForm() {
  const toDoWrapper = document.createElement("div");
  const form = document.createElement("form");
  const errorMsg = document.createElement("div");
  const titleRow = document.createElement("div");
  const dateRow = document.createElement("div");
  const textRow = document.createElement("div");
  const textContent = document.createElement("div");
  const titleLabel = document.createElement("label");
  const dateLabel = document.createElement("label");
  const textLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const dateInput = document.createElement("input");
  const textArea = document.createElement("textarea");
  const btnRow = document.createElement("div");
  const submitBtn = document.createElement("button");
  const resetBtn = document.createElement("button");

  toDoWrapper.classList.add("to-do-wrapper");
  form.classList.add("flex-col", "todo__form");
  errorMsg.setAttribute("id", "error");
  errorMsg.classList.add("errorMsg");
  titleRow.classList.add("inputRow", "flex");
  dateRow.classList.add("inputRow", "flex");
  textRow.classList.add("inputRow", "flex");
  textContent.classList.add("textContent");
  btnRow.classList.add("flex_btns");
  submitBtn.classList.add("form_btn");
  resetBtn.classList.add("form_btn");
  form.setAttribute("id", "form");
  titleLabel.setAttribute("for", "todo__title");
  titleLabel.textContent = "Title:";
  dateLabel.setAttribute("for", "todo__date");
  dateLabel.textContent = "Due:";
  textLabel.setAttribute("for", "todo__text");
  textLabel.textContent = "Description:";
  titleInput.setAttribute("id", "todo__title");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("required", "");
  dateInput.setAttribute("id", "todo__date");
  dateInput.setAttribute("name", "date");
  dateInput.setAttribute("type", "text");
  dateInput.setAttribute("required", "");
  textArea.setAttribute("id", "todo__text");
  textArea.setAttribute("required", "");
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.textContent = "add";
  resetBtn.setAttribute("id", "resetBtn");
  resetBtn.textContent = "reset";

  titleRow.append(titleLabel, titleInput);
  dateRow.append(dateLabel, dateInput);
  textRow.appendChild(textContent);
  textContent.append(textLabel, textArea);
  btnRow.append(submitBtn, resetBtn);
  form.append(errorMsg, titleRow, dateRow, textRow, btnRow);
  toDoWrapper.append(form);
  notesGrid.appendChild(toDoWrapper);

  document
    .getElementById("submitBtn")
    .addEventListener("click", intakeFormData);

  toDoWrapper.addEventListener("click", (e) => {
    if (e.target === toDoWrapper) {
      notesGrid.removeChild(toDoWrapper);
    } else return;
  });
}
