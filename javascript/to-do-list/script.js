function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  renderTasks();

  taskInput.value = "";
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    if (task.completed) taskSpan.classList.add("completed");
    taskSpan.textContent = task.text;
    taskSpan.onclick = () => toggleComplete(index);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const tick = document.createElement("span");
    tick.textContent = "✔";
    tick.className = "tick";
    tick.title = "Mark complete";
    tick.onclick = () => toggleComplete(index);

    const del = document.createElement("span");
    del.textContent = "🗑";
    del.className = "delete";
    del.title = "Delete task";
    del.onclick = () => deleteTask(index);

    actionsDiv.appendChild(tick);
    actionsDiv.appendChild(del);

    li.appendChild(taskSpan);
    li.appendChild(actionsDiv);
    taskList.appendChild(li);
  });
}

window.onload = renderTasks;
