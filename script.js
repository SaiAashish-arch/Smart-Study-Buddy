let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completed = JSON.parse(localStorage.getItem("completed")) || [];

function goToSchedule() {
  window.location.href = "schedule.html";
}
function addTask() {
  const task = prompt("Enter Task");
  const time = prompt("Enter Start & Due Time");
  const subject = prompt("Enter Subject Name");
  if (!task) return;
  tasks.push({ task, time, subject });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  location.reload();
}
function renderTasks() {
  const table = document.getElementById("taskTable");
  if (!table) return;
  table.innerHTML = "";
  tasks.forEach((t, i) => {
    table.innerHTML += `
      <tr>
        <td>${t.task}</td>
        <td>${t.time}</td>
        <td>${t.subject}</td>
        <td>
          <span style="color:green;cursor:pointer" onclick="completeTask(${i})">✔</span>
          &nbsp;
          <span style="color:red;cursor:pointer" onclick="deleteTask(${i})">✖</span>
        </td>
      </tr>
    `;
  });
}
function completeTask(index) {
  const doneTask = tasks.splice(index, 1)[0];
  doneTask.doneTime = new Date().toLocaleString();
  completed.push(doneTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("completed", JSON.stringify(completed));
  location.reload();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  location.reload();
}
function renderCompleted() {
  const table = document.getElementById("completedTable");
  if (!table) return;
  table.innerHTML = "";
  completed.forEach(t => {
    table.innerHTML += `
      <tr>
        <td>${t.task}</td>
        <td>${t.doneTime}</td>
        <td>${t.subject}</td>
        <td>✔</td>
      </tr>
    `;
  });
}
renderTasks();
renderCompleted();
