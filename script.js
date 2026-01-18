const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update stats
function updateStats() {
  totalCount.innerText = `Total: ${tasks.length}`;
  const done = tasks.filter(t => t.done).length;
  doneCount.innerText = `Done: ${done}`;
}

// Render tasks on screen
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");

    li.innerHTML = `
      <div class="left">
        <input type="checkbox" ${task.done ? "checked" : ""} />
        <span class="text"></span>
      </div>
      <button class="small-btn">Delete</button>
    `;

    li.querySelector(".text").innerText = task.text;

    // Toggle done
    li.querySelector("input").addEventListener("change", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    // Delete task
    li.querySelector("button").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });

  updateStats();
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text, done: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

// Clear all tasks
function clearAll() {
  if (tasks.length === 0) return;
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

// Events
addBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAll);

// Press Enter to add
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// First load
renderTasks();