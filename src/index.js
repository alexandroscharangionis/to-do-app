"use strict";

import {
  toDoList,
  createToDo,
  displayToDo,
  expandClickedItems,
} from "/src/toDoFunctions";
import "../src/style.css";

createToDo(
  "Clean house",
  "today 5pm",
  "Vacuum all rooms. Dust shelves. Mop all the floors. Thoroughly clean bathroom."
);
createToDo(
  "Learn coding",
  "thursday 2pm",
  "Learn functions and variables. Practice arrays and objects. Run some loops. Solve bugs."
);
createToDo(
  "Make food",
  "monday 8am",
  "Make breakfast. Prepare dinner. Cook lunch. Store it for later."
);

for (let i = 0; i < toDoList.length; i++) {
  displayToDo(toDoList[i]);
}

expandClickedItems();
