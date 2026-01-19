let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completed = JSON.parse(localStorage.getItem("completed")) || [];

function openForm() {
  document.getElementById("taskForm").classList.toggle("hidden");
}
function addTask() {
  let task = {
    name: taskName.value,
    start: startTime.value,
    due: dueTime.value,
    subject: subject.value
  };
  if (!task.name || !task.start || !task.due || !task.subject) {
    alert("Please fill all details");
    return;
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
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
