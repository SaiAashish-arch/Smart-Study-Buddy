let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completed = JSON.parse(localStorage.getItem("completed")) || [];
const quotes = [
  "Believe in yourself!",
  "Focus on progress, not perfection.",
  "One step at a time.",
  "Your future is created by what you do today!",
  "Stay consistent, stay strong!"
];
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-bg");
});
function openForm() {
  document.getElementById("taskForm").classList.remove("hidden");
}
function closeForm() {
  document.getElementById("taskForm").classList.add("hidden");
  clearForm();
}
function addTask() {
  let taskName = document.getElementById("taskName").value;
  let startTime = document.getElementById("startTime").value;
  let dueTime = document.getElementById("dueTime").value;
  let subject = document.getElementById("subject").value;
  if (!taskName || !startTime || !dueTime || !subject) {
    alert("Please fill all details");
    return;
  }
  if (document.getElementById("taskForm").dataset.editIndex !== undefined) {
    let index = document.getElementById("taskForm").dataset.editIndex;
    tasks[index] = { name: taskName, start: startTime, due: dueTime, subject: subject };
    delete document.getElementById("taskForm").dataset.editIndex;
  } else {
    tasks.push({ name: taskName, start: startTime, due: dueTime, subject: subject });
  }
  saveTasks();
  displayTasks();
  closeForm();
}
function displayTasks() {
  const table = document.getElementById("taskTable");
  if (!table) return;
  table.innerHTML = "";
  tasks.forEach((t, i) => {
    table.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.start}<br>${t.due}</td>
        <td>${t.subject}</td>
        <td><span class="tick" onclick="completeTask(${i})">✔</span></td>
        <td id="timer${i}">Calculating...</td>
        <td>
          <span class="btn-small" onclick="editTask(${i})">Edit</span>
          <span class="btn-red" onclick="deleteTask(${i})">Delete</span>
        </td>
      </tr>
    `;
  });
}
function completeTask(index) {
  let task = tasks.splice(index, 1)[0];
  task.completedTime = new Date().toLocaleString();
  completed.push(task);
  saveTasks();
  displayTasks();
  displayCompleted();
  updateProgress();
}
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
    updateProgress();
  }
}
function editTask(index) {
  const t = tasks[index];
  document.getElementById("taskName").value = t.name;
  document.getElementById("startTime").value = t.start;
  document.getElementById("dueTime").value = t.due;
  document.getElementById("subject").value = t.subject;
  document.getElementById("taskForm").classList.remove("hidden");
  document.getElementById("taskForm").dataset.editIndex = index;
}
function displayCompleted() {
  const table = document.getElementById("completedTable");
  if (!table) return;
  table.innerHTML = "";
  completed.forEach(t => {
    table.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.completedTime}</td>
        <td>${t.subject}</td>
        <td>✔</td>
      </tr>
    `;
  });
}
function updateTimers() {
  tasks.forEach((t, i) => {
    const cell = document.getElementById(`timer${i}`);
    if (!cell) return;
    let now = new Date();
    let due = new Date(t.due);
    let diff = due - now;
    if (diff > 0) {
      let hours = Math.floor(diff / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
      cell.innerText = `${hours}h ${minutes}m ${seconds}s`;
      if (diff <= 5 * 60 * 1000) {
        cell.style.color = "red";
      } else {
        cell.style.color = "";
      }
    } else {
      cell.innerText = "Time's up!";
      cell.style.color = "red";
    }
  });
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("completed", JSON.stringify(completed));
}
function updateProgress() {
  const pending = tasks.length;
  const done = completed.length;
  const percent = pending + done === 0 ? 0 : Math.round((done / (pending + done)) * 100);
  document.getElementById("pendingCount")?.innerText = pending;
  document.getElementById("completedCount")?.innerText = done;
  document.getElementById("progressPercent")?.innerText = percent + "%";
}
function showQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const welcomeText = document.getElementById("welcomeText");
  if (welcomeText) {
    welcomeText.innerHTML += `<br><em>"${quote}"</em>`;
  }
}
function clearForm() {
  document.getElementById("taskName").value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("dueTime").value = "";
  document.getElementById("subject").value = "";
  delete document.getElementById("taskForm").dataset.editIndex;
}
displayTasks();
displayCompleted();
updateTimers();
updateProgress();
showQuote();
setInterval(updateTimers, 1000);
