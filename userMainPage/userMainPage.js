const active = document.getElementById("active");
const inProgress = document.getElementById("in-progress");
const completed = document.getElementById("completed");

const MAIN_URL = "http://localhost:5000/user"

async function getAllTasks() {
  const token = localStorage.getItem("token");
  let data = await fetch(`${MAIN_URL}/all/${token}`);
  tasks = await data.json();
  return tasks;
}

async function filterActive() {
  const all = await getAllTasks()
  return all?.filter((item) => item.status == 3);
}

const filterInProgress = async () => {
  const all = await getAllTasks()
  return all?.filter((item) => item.status == 2);
};

const filterCompleted = async () => {
  const all = await getAllTasks()
  return all?.filter((item) => item.status == 1);
};

const render = async () => {
  let arrayActiveToRender = await filterActive();
  let htmlActiveList =
    '<h1 class="display-6" id="register-header">Активные задачи</h1>';
  let arrayInProgressToRender = await filterInProgress();
  let htmlInProgressList =
    '<h1 class="display-6" id="register-header">Выполняющиеся задачи</h1>';
  let arrayCompletedToRender = await filterCompleted();
  let htmlCompletedList =
    '<h1 class="display-6" id="register-header">Завершенные задачи</h1>';
  arrayActiveToRender?.forEach((element) => {
    htmlActiveList += `<div class="card" id="${element.taskId}">
    <div class="card-body">
      <h5 class="card-title">${element.task.name}</h5>
      <p class="card-text">${element.task.content}</p>
      <button type="button" class="btn btn-primary bot-button" id="${element.taskId}">↓</button>
    </div>
  </div>`;
  });
  active.innerHTML = htmlActiveList;
  arrayInProgressToRender?.forEach((element) => {
    htmlInProgressList += `<div class="card" id="${element.taskId}">
    <div class="card-body">
      <h5 class="card-title">${element.task.name}</h5>
      <p class="card-text">${element.task.content}</p>
      <button type="button" class="btn btn-primary bot-button" id="${element.taskId}">↓</button>
      <button type="button" class="btn btn-primary top-button" id="${element.taskId}">↑</button>
    </div>
  </div>`;
  });
  inProgress.innerHTML = htmlInProgressList;

  arrayCompletedToRender?.forEach((element) => {
    htmlCompletedList += `<div class="card" id="${element.taskId}">
    <div class="card-body">
      <h5 class="card-title">${element.task.name}</h5>
      <p class="card-text">${element.task.content}</p>
      <button type="button" class="btn btn-primary top-button" id="${element.taskId}">↑</button>
    </div>
  </div>`;
  });
  completed.innerHTML = htmlCompletedList;
};

render();

const changeStatus = async (event) => {
  const id = event.target.id;
  const allTasks = await getAllTasks();
  if (event.target.className.toString().includes("top-button")) {
    let { status } = await allTasks.find(element => element.taskId = id);
    status += 1;
    await fetch(`${MAIN_URL}/change/${localStorage.getItem("token")}?task=${id}&status=${status}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    };
    render();
  if (event.target.className.toString().includes("bot-button")) {
    let { status } = await allTasks.find(element => element.taskId = id);
    status -= 1;
    await fetch(`${MAIN_URL}/change/${localStorage.getItem("token")}?task=${id}&status=${status}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    render();
  }
};

active.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  active.scrollLeft += evt.deltaY;
});

inProgress.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  inProgress.scrollLeft += evt.deltaY;
});

completed.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  completed.scrollLeft += evt.deltaY;
});

active.addEventListener("click", changeStatus);
inProgress.addEventListener("click", changeStatus);
completed.addEventListener("click", changeStatus);
