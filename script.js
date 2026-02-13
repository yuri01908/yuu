const MAX_TASKS = 5;
const MIN_TASKS = 3;

const rabbitMessages = [
  "急がないと遅れちゃうよ〜！🐇💦",
  "いいね！ちゃんと進んでるよ！",
  "その調子！時計はまだ大丈夫⌛",
  "とってもえらいよ、アリス！",
  "完璧！物語の続きを読もう📖✨"
];

function initTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (let i = 0; i < MAX_TASKS; i++) {
    const task = savedTasks[i] || { text: "", done: false };

    const div = document.createElement("div");
    div.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `タスク ${i + 1}`;
    input.value = task.text;

    checkbox.addEventListener("change", saveTasks);
    input.addEventListener("input", saveTasks);

    div.appendChild(checkbox);
    div.appendChild(input);
    taskList.appendChild(div);
  }

  updateRabbit();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach(taskDiv => {
    const checkbox = taskDiv.querySelector("input[type=checkbox]");
    const input = taskDiv.querySelector("input[type=text]");
    tasks.push({
      text: input.value,
      done: checkbox.checked
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateRabbit();
}

function updateRabbit() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const validTasks = tasks.filter(t => t.text);
  const completed = validTasks.filter(t => t.done).length;
  const rabbit = document.getElementById("rabbitMessage");

  if (completed === validTasks.length && completed >= MIN_TASKS) {
    rabbit.textContent = rabbitMessages[4];
    unlockStory();
  } else {
    rabbit.textContent = rabbitMessages[Math.min(completed, 3)];
  }
}

function unlockStory() {
  let progress = Number(localStorage.getItem("storyProgress") || 0);
  localStorage.setItem("storyProgress", progress + 1);
}
