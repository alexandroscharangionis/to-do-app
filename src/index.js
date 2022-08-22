"use strict";

import {
  toDoList,
  createToDo,
  displayToDo,
  expandClickedItems,
} from "/src/toDoFunctions";
import "../src/style.css";
import { createForm } from "/src/generate_DOM_elements";
import { sortByActive } from "./sorting";

const newBtn = document.getElementById("createNew");
newBtn.addEventListener("click", createForm);

const active = document.getElementById("active");
active.addEventListener("click", sortByActive);
