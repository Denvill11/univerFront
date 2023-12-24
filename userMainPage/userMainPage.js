const active = document.getElementById("active");
const inProgress = document.getElementById("in-progress");
const completed = document.getElementById("completed");

const tasks = [
  { id: 1, status: 1, title: "Task 1", text: "Description 1" },
  { id: 2, status: 2, title: "Task 2", text: "Description 2" },
  { id: 3, status: 3, title: "Task 3", text: "Description 3" },
  { id: 4, status: 1, title: "Task 4", text: "Description 4" },
  { id: 5, status: 1, title: "Task 5", text: "Description 5" },
  { id: 6, status: 1, title: "Task 6", text: "Description 6" },
  { id: 7, status: 1, title: "Task 7", text: "Description 7" },
  { id: 8, status: 2, title: "Task 8", text: "Description 8" },
  { id: 9, status: 3, title: "Task 9", text: "Description 9" },
  { id: 10, status: 1, title: "Task 10", text: "Description 10" },
];

function filterActive() {
  return tasks.filter((item) => item.status == 3);
}

const filterInProgress = () => {
  return tasks.filter((item) => item.status == 2);
};

const filterCompleted = () => {
  return tasks.filter((item) => item.status == 1);
};

const render = () => {
  let arrayActiveToRender = filterActive();
  let htmlActiveList =
    '<h1 class="display-6" id="register-header">Активные задачи</h1>';
  let arrayInProgressToRender = filterInProgress();
  let htmlInProgressList =
    '<h1 class="display-6" id="register-header">Выполняющиеся задачи</h1>';
  let arrayCompletedToRender = filterCompleted();
  let htmlCompletedList =
    '<h1 class="display-6" id="register-header">Завершенные задачи</h1>';
  arrayActiveToRender.forEach((element) => {
    htmlActiveList += `<div class="card" id="${element.id}">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.text}</p>
      <button type="button" class="btn btn-primary bot-button" id="${element.id}">↓</button>
    </div>
  </div>`;
  });
  active.innerHTML = htmlActiveList;
  arrayInProgressToRender.forEach((element) => {
    htmlInProgressList += `<div class="card" id="${element.id}">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.text}</p>
      <button type="button" class="btn btn-primary bot-button" id="${element.id}">↓</button>
      <button type="button" class="btn btn-primary top-button" id="${element.id}">↑</button>
    </div>
  </div>`;
  });
  inProgress.innerHTML = htmlInProgressList;

  arrayCompletedToRender.forEach((element) => {
    htmlCompletedList += `<div class="card" id="${element.id}">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.text}</p>
      <button type="button" class="btn btn-primary top-button" id="${element.id}">↑</button>
    </div>
  </div>`;
  });
  completed.innerHTML = htmlCompletedList;
};

render();

const changeStatus = (event) => {
  const id = event.target.id;
  if (event.target.className.toString().includes("top-button")) {
    tasks.find((element) => {
      if(element.id == id) {
        element.status += 1;
      }
    });
    render();
  }
  if (event.target.className.toString().includes("bot-button")) {
    tasks.find((element) => {
      if(element.id == id) {
        element.status = element.status -= 1;
      }
    });
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
