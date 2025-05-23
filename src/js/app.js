const taskInput = document.querySelector("#task");
const dueDateInput = document.querySelector("#due-date");
const taskList = document.querySelector("#task-list");
const inProgressList = document.querySelector("#in-progress-list");
const completeList = document.querySelector("#complete-list");

function addTask(task, dueDate) {
  // Create list item
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

  // Create div for task name
  const divTask = document.createElement("div");
  divTask.textContent = task;
  divTask.classList.add("task-name");

  // Create div for due date
  const divDueDate = document.createElement("div");
  divDueDate.textContent = dueDate;
  divDueDate.classList.add("due-date");

  // Get current date
  const currentDate = new Date();

  // Compare due date with current date
  const dueDateObj = new Date(dueDate);
  if (dueDateObj < currentDate) {
    li.classList.add("list-group-item-danger");
  } else if (dueDateObj.getDate() - currentDate.getDate() <= 3) {
    li.classList.add("list-group-item-warning");
  } else {
    li.classList.add("list-group-item-success");
  }

  // Create div for buttons
  const divButtons = document.createElement("div");

  // Create in progress button
  const inProgressButton = document.createElement("button");
  inProgressButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
  inProgressButton.classList.add("btn", "btn-outline-primary", "btn-sm", "mr-2");
  inProgressButton.addEventListener("click", moveTaskInProgress);
  inProgressButton.setAttribute("data-toggle", "tooltip");
  inProgressButton.setAttribute("data-placement", "top");
  inProgressButton.setAttribute("title", "Move to In Progress");

   //Create edit button
   const editButton = document.createElement("button");
   editButton.innerHTML = '<i class="fas fa-pen"></i>';
   editButton.classList.add("btn", "btn-outline-primary", "btn-sm", "mr-2");
   editButton.addEventListener("click", editTask);
   editButton.setAttribute("data-toggle", "tooltip");
   editButton.setAttribute("data-placement", "top");
   editButton.setAttribute("title", "Edit task");
  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm", "mr-2");
  deleteButton.addEventListener("click", deleteTask);
  deleteButton.setAttribute("data-toggle", "tooltip");
  deleteButton.setAttribute("data-placement", "top");
  deleteButton.setAttribute("title", "Delete task");

  // Add all elements to list item
  divButtons.appendChild(inProgressButton);
  divButtons.appendChild(deleteButton);
  li.appendChild(divTask);
  li.appendChild(divDueDate);
  li.appendChild(divButtons);
  li.appendChild(editButton);

  // Add list item to task list
  taskList.appendChild(li);

 // Generate a unique key for the task
// const taskKey = database.ref().child('tasks').push().key;

 // Create a data object for the task
 const taskData = {
   task: task,
   dueDate: dueDate
 };

 // Save the task to the Firebase database
//  database.ref('tasks/' + taskKey).set(taskData)
//    .then(() => {
//      console.log("Task added to Firebase");
//    })
//    .catch((error) => {
//      console.error("Error adding task to Firebase:", error);
//    });
// }



function editTask(event) {
  const listItem = event.target.parentElement.parentElement;
  const task = listItem.querySelector(".task-name");
  const dueDate = listItem.querySelector(".due-date");

  // Create form for editing task
  const form = document.createElement("form");
  form.classList.add("edit-form");


  // Create title for form
  const title = document.createElement("h2");
  form.classList.add("edit-task");
  title.textContent = "Edit Task";

  // Create input for task name
  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.value = task.textContent;
  const taskLabel = document.createElement("label");
  taskLabel.textContent = "Task Name:";
  taskLabel.appendChild(taskInput);

  // Create input for due date
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.value = dueDate.textContent;
  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due Date:";
  dueDateLabel.appendChild(dueDateInput);

  // Create submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Save Changes";

  // Handle form submission
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Update task, due date, and priority values
    task.textContent = taskInput.value;
    dueDate.textContent = dueDateInput.value;

    // Remove modal overlay
    const modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "none";
  });

  // Add inputs and submit button to form
  form.appendChild(title);
  form.appendChild(taskLabel);
  form.appendChild(dueDateLabel);
  form.appendChild(submitButton);

  // Create modal container and append form to it
const modalContainer = document.createElement("div");
modalContainer.id = "modal-container";
modalContainer.appendChild(form);

// Create modal overlay and append modal container to it
const modalOverlay = document.getElementById("modal-overlay");
modalOverlay.appendChild(modalContainer);

// Display modal overlay
modalOverlay.style.display = "block";
}

// Add event listener for edit button on each list item
document.querySelectorAll(".edit-button").forEach(function(button) {
button.addEventListener("click", editTask);
});

// Move task to In Progress
function moveTaskInProgress(event) {
  const listItem = event.target.closest("li");
  const task = listItem.querySelector(".task-name").textContent;
  const dueDate = listItem.querySelector(".due-date").textContent;

  listItem.remove();

  // Create list item for In Progress
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

  // Create div for task name
  const divTask = document.createElement("div");
  divTask.textContent = task;
  divTask.classList.add("task-name");

  // Create div for due date
  const divDueDate = document.createElement("div");
  divDueDate.textContent = dueDate;
  divDueDate.classList.add("due-date");

  // Get current date
  const currentDate = new Date();

  // Compare due date with current date
  const dueDateObj = new Date(dueDate);
  if (dueDateObj < currentDate) {
    li.classList.add("list-group-item-danger");
  } else if (dueDateObj.getDate() - currentDate.getDate() <= 3) {
    li.classList.add("list-group-item-warning");
  } else {
    li.classList.add("list-group-item-success");
  }

  // Create complete button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("btn", "btn-outline-success", "btn-sm", "mr-2");
  completeButton.addEventListener("click", moveTaskToComplete);
  completeButton.setAttribute("data-toggle", "tooltip");
  completeButton.setAttribute("data-placement", "top");
  completeButton.setAttribute("title", "Mark as Complete");

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm", "mr-2");
  deleteButton.addEventListener("click", deleteTask);
  deleteButton.setAttribute("data-toggle", "tooltip");
  deleteButton.setAttribute("data-placement", "top");
  deleteButton.setAttribute("title", "Delete task");

  // Add all elements to list item
  li.appendChild(divTask);
  li.appendChild(divDueDate);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  // Add list item to In Progress list
  inProgressList.appendChild(li);
}

// Move task to Complete
function moveTaskToComplete(event) {
  const listItem = event.target.closest("li");

  listItem.remove();

  // Create list item for Complete
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

  // Create div for task name
  const divTask = document.createElement("div");
  divTask.textContent = listItem.querySelector(".task-name").textContent;
  divTask.classList.add("task-name", "completed");

  // Create div for due date
  const divDueDate = document.createElement("div");
  divDueDate.textContent = listItem.querySelector(".due-date").textContent;
  divDueDate.classList.add("due-date");

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm", "mr-2");
  deleteButton.addEventListener("click", deleteTask);
  deleteButton.setAttribute("data-toggle", "tooltip");
  deleteButton.setAttribute("data-placement", "top");
  deleteButton.setAttribute("title", "Delete task");

  // Add all elements to list item
  li.appendChild(divTask);
  li.appendChild(divDueDate);
  li.appendChild(deleteButton);

  // Add list item to Complete list
  completeList.appendChild(li);
}

// Delete task
function deleteTask(event) {
  const listItem = event.target.closest("li");
  listItem.remove();
}

// Submit form
document.querySelector("#addTaskButton").addEventListener("click", function() {
  const taskInput = document.querySelector("#task");
  const dueDateInput = document.querySelector("#due-date");
  const task = taskInput.value;
  const dueDate = dueDateInput.value;
  addTask(task, dueDate);
  taskInput.value = "";
  dueDateInput.value = "";
});

addTask("Complete homework", "2023-05-01");
addTask("Buy groceries", "2023-05-03");
addTask("Go for a run", "2023-05-04");

}