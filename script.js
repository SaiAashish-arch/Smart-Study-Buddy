let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completed = JSON.parse(localStorage.getItem("completed")) || [];
function openForm() {
  document.getElementById("taskForm").classList.toggle("hidden");
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
  let task = {
    name: taskName,
    start: startTime,
    due: dueTime,
    subject: subject
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  document.getElementById("taskName").value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("dueTime").value = "";
  document.getElementById("subject").value = "";
}
function displayTasks() {
  let table = document.getElementById("taskTable");
  if (!table) return;
  table.innerHTML = "";
  tasks.forEach((t, i) => {
    table.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.start}<br>${t.due}</td>
        <td>${t.subject}</td>
        <td>
          <span class="tick" onclick="completeTask(${i})">✔</span>
          &nbsp;
          <span class="cross">✖</span>
        </td>
      </tr>
    `;
  });
}
function completeTask(index) {
  let task = tasks.splice(index, 1)[0];
  task.completedTime = new Date().toLocaleString();
  completed.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("completed", JSON.stringify(completed));
  displayTasks();
}
function displayCompleted() {
  let table = document.getElementById("completedTable");
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
displayTasks();
displayCompleted();
