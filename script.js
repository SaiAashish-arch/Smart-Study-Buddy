const quotes = [
  "Believe in yourself ",
  "Discipline beats motivation ",
  "Study now, shine later ",
  "You are closer than you think "
];
document.getElementById("quote").innerText =
  quotes[Math.floor(Math.random() * quotes.length)];
let completed = 0;
function saveName() {
    const name = document.getElementById("username").value;
    document.getElementById("welcome").innerText =
        "Welcome, " + name + " 👋";
}
function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value === "") return;
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="done(this)">${taskInput.value}</span>
      <button onclick="removeTask(this)">❌</button>
    `;
    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
}
function done(task) {
    if (!task.classList.contains("done")) {
        task.classList.add("done");
        completed++;
        document.getElementById("counter").innerText =
            "Completed: " + completed;
    }
}
function removeTask(btn) {
    btn.parentElement.remove();
}
let time = 1500;
let timer;
function startTimer() {
    timer = setInterval(() => {
        if (time <= 0) clearInterval(timer);
        time--;
        document.getElementById("time").innerText =
            Math.floor(time/60) + ":" + String(time%60).padStart(2,"0");
    }, 1000);
}
function resetTimer() {
    clearInterval(timer);
    time = 1500;
    document.getElementById("time").innerText = "25:00";
}
