"use strict";

import { createToDo, displayToDo, expandClickedItems } from "./toDoFunctions";
import { createExpandedToDoElements } from "./generate_DOM_elements";

// Takes input data, creates new object based on data, displays the data
export default function intakeFormData(event) {
  event.preventDefault();
  const error = document.getElementById("error");
  const title = document.getElementById("todo__title").value;
  const date = document.getElementById("todo__date").value;
  const description = document.getElementById("todo__text").value;
  if (title === "" || description === "") {
    error.textContent = "Please fill in every field.";
    return;
  } else if (title.length > 20) {
    error.textContent = "Title shouldn't be longer than 20 characters.";
  } else {
    error.textContent = "";
    const [itemReference, itemObj] = displayToDo(
      createToDo(title, date, description)
    );

    document.getElementById("form").reset();
    notesGrid.removeChild(document.querySelector(".to-do-wrapper"));

    // Event listener that expands the to-do item if clicked to display full description
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
  }
}
