"use strict";

import { intakeFormData, createProjectAndOpen } from "./formFunction";
import { projects, projectTitle } from "./projectFunctions";
import { currentProject } from "./projectFunctions";
import { notesGrid } from "./toDoFunctions";

// Helper function for creating element, adding classes, attributes and textcontent
function DOMify(el, classArr, attrObj, textContent) {
  const element = document.createElement(el);
  if (classArr) {
    for (const classname of classArr) {
      element.classList.add(classname);
    }
  }
  if (attrObj) {
    for (const [attr, value] of Object.entries(attrObj)) {
      element.setAttribute(attr, value);
    }
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}
// Helper function that removes all elements from notesGrid
export function clearNotesGrid() {
  const notesGrid = document.getElementById("notesGrid");
  const allItems = document.querySelectorAll(".notes__grid--item");
  allItems.forEach((item) => {
    notesGrid.removeChild(item);
  });
}

export function changeSidebarContentProject() {
  projectTitle.textContent = currentProject.title;
  projectTitle.setAttribute("contenteditable", "true");
  document.getElementById("list-item-1").style.display = "block";
  document.getElementById("list-item-2").style.display = "block";
  document.getElementById("editIcon").style.display = "block";
}
export function changeSidebarContentAllProjects() {
  projectTitle.textContent = "Projects";
  projectTitle.setAttribute("contenteditable", "false");
  document.getElementById("list-item-1").style.display = "none";
  document.getElementById("list-item-2").style.display = "none";
  document.getElementById("editIcon").style.display = "none";
}

// Creates DOM elements, appends them to DOM, returns reference to main item and it's buttons"
export function createToDoElements(toDo) {
  const toDoItem = DOMify("div", ["notes__grid--item", "flex-col"], {
    id: `item${toDo.key}`,
  });
  const toDoTitle = DOMify(
    "h3",
    ["notes__grid--item-title"],
    undefined,
    `${toDo.title}`
  );
  const projectBox = document.createElement("div");
  const toDoProjectPara = DOMify(
    "p",
    ["notes__grid--item-para"],
    undefined,
    "Project:"
  );
  const toDoProjectSpan = DOMify(
    "span",
    ["projectSpan"],
    undefined,
    `${toDo.project}`
  );
  const deadlineBox = document.createElement("div");
  const duePara = DOMify("p", ["notes__grid--item-para"], undefined, "Due:");
  const dueSpan = DOMify("span", undefined, undefined, `${toDo.dueDate}`);
  const doneBtn = DOMify(
    "button",
    ["doneBtn"],
    { id: `done${toDo.key}` },
    "done?"
  );
  const deleteBtn = DOMify(
    "button",
    ["deleteBtn"],
    { id: `del${toDo.key}` },
    "delete"
  );

  toDoItem.append(toDoTitle, projectBox, deadlineBox, doneBtn, deleteBtn);
  projectBox.append(toDoProjectPara, toDoProjectSpan);
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
  const toDoWrapper = DOMify("div", ["to-do-wrapper"], {
    id: `wrapper${toDo.title}`,
  });
  const toDoContent = DOMify("div", ["to-do-content", "flex-col"]);
  const toDoTitle = DOMify(
    "h3",
    ["notes__grid--item-title"],
    undefined,
    `${toDo.title}`
  );
  const toDoText = DOMify("p", undefined, undefined, `${toDo.text}`);

  // Adds new line if user pressed "enter"
  toDoText.innerHTML = toDoText.innerHTML.replace(/\n/g, "<br>\n");

  toDoWrapper.appendChild(toDoContent);
  toDoContent.append(toDoTitle, toDoText);
  notesGrid.appendChild(toDoWrapper, toDoContent);
}

// Creates DOM elements, adds CSS styles, appends them to DOM, adds event listener for data intake
export function createForm() {
  const toDoWrapper = DOMify("div", ["to-do-wrapper"]);
  const form = DOMify("form", ["flex-col", "todo__form"], { id: "form" });
  const errorMsg = DOMify("div", ["errorMsg"], { id: "error" });
  const titleRow = DOMify("div", ["inputRow", "flex"]);
  const projectRow = DOMify("div", ["inputRow", "flex"]);
  const dateRow = DOMify("div", ["inputRow", "flex"]);
  const textRow = DOMify("div", ["inputRow", "flex"]);
  const textContent = DOMify("div", ["textContent"]);
  const titleLabel = DOMify(
    "label",
    undefined,
    { for: "todo__title" },
    "Title:"
  );
  const projectLabel = DOMify(
    "label",
    undefined,
    { for: "todo__project" },
    "Project:"
  );
  const dateLabel = DOMify("label", undefined, { for: "todo__date" }, "Due:");
  const textLabel = DOMify(
    "label",
    undefined,
    { for: "todo__text" },
    "Description:"
  );
  const titleInput = DOMify("input", ["inputSize"], {
    id: "todo__title",
    name: "title",
    type: "text",
    required: "",
  });
  const projectInput = DOMify("select", ["inputSize"], {
    id: "todo__project",
    name: "select",
    required: "",
  });
  const dateInput = DOMify("input", ["inputSize"], {
    id: "todo__date",
    name: "date",
    type: "date",
    required: "",
  });
  const textArea = DOMify("textarea", undefined, {
    id: "todo__text",
    required: "",
  });
  const btnRow = DOMify("div", ["flex_btns"]);
  const submitBtn = DOMify("button", ["form_btn"], { id: "submitBtn" }, "add");
  const resetBtn = DOMify("button", ["form_btn"], { id: "resetBtn" }, "reset");

  // Loop through projects array and create 'option' element for every available project
  for (let i = 0; i < projects.length; i++) {
    let option = DOMify(
      "option",
      undefined,
      { id: `option${i}`, value: `${projects[i].title}` },
      `${projects[i].title}`
    );
    projectInput.appendChild(option);
  }

  titleRow.append(titleLabel, titleInput);
  projectRow.append(projectLabel, projectInput);
  dateRow.append(dateLabel, dateInput);
  textRow.appendChild(textContent);
  textContent.append(textLabel, textArea);
  btnRow.append(submitBtn, resetBtn);
  form.append(errorMsg, titleRow, projectRow, dateRow, textRow, btnRow);
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

// Creates DOM elements, appends them to DOM, returns reference to main item and delete button"
export function createProjectItem(project) {
  const notesGrid = document.getElementById("notesGrid");
  const projectItem = DOMify("div", ["notes__grid--item", "flex-col"], {
    id: `project${project.key}`,
  });
  const projectTitle = DOMify(
    "h3",
    ["notes__grid--item-title"],
    undefined,
    `${project.title}`
  );
  const deleteBtn = DOMify(
    "button",
    ["deleteBtn"],
    { id: `del${project.key}` },
    "delete"
  );

  projectItem.append(projectTitle, deleteBtn);
  notesGrid.appendChild(projectItem);

  return [
    document.getElementById(`project${project.key}`),
    document.getElementById(`del${project.key}`),
  ];
}

export function createProjectForm() {
  const toDoWrapper = DOMify("div", ["to-do-wrapper"]);
  const form = DOMify("form", ["flex-col", "todo__form"], { id: "form" });
  const errorMsg = DOMify("div", ["errorMsg"], { id: "error" });
  const titleRow = DOMify("div", ["inputRow", "flex"]);
  const titleLabel = DOMify(
    "label",
    undefined,
    { for: "project__title" },
    "Title:"
  );
  const titleInput = DOMify("input", ["inputSize"], {
    id: "project__title",
    name: "title",
    type: "text",
    required: "",
  });
  const btnRow = DOMify("div", ["flex_btns"]);
  const submitBtn = DOMify(
    "button",
    ["form_btn"],
    { id: "submitBtn" },
    "create"
  );
  const resetBtn = DOMify("button", ["form_btn"], { id: "resetBtn" }, "reset");

  titleRow.append(titleLabel, titleInput);
  btnRow.append(submitBtn, resetBtn);
  form.append(errorMsg, titleRow, btnRow);
  toDoWrapper.appendChild(form);
  notesGrid.appendChild(toDoWrapper);

  document
    .getElementById("submitBtn")
    .addEventListener("click", createProjectAndOpen);
  toDoWrapper.addEventListener("click", (e) => {
    if (e.target === toDoWrapper) {
      notesGrid.removeChild(toDoWrapper);
    } else return;
  });
}

// Generates button for creating new project
export function generateNewProjectButton() {
  if (document.getElementById("newProjectBtn")) {
    return;
  } else {
    const newProjectBtn = DOMify(
      "button",
      ["icon3"],
      { id: "newProjectBtn" },
      "+"
    );

    newProjectBtn.style.fontSize = "3rem";

    newProjectBtn.onmouseover = function () {
      this.style.transform = "scale(1.02)";
    };
    newProjectBtn.onmouseleave = function () {
      this.style.transform = "scale(1)";
    };

    notesGrid.appendChild(newProjectBtn);

    newProjectBtn.addEventListener("click", createProjectForm);
  }
}
