const addTask = document.getElementById("add-task");
const taskArea = document.getElementById("tasks-area");

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

const addNewTask = () => {
  renderTaskBox();
}

const removeBack = () => {
  renderTaskBox();
}

const renderTaskBox = () => { 
  let arrayToRender = tasks;
  let htmlList = '';
  arrayToRender.forEach((element) => { 
    htmlList += `<div class="task" id="${element.id}">
    <h1 class="display-6" id="register-header">${element.title}</h1>
    <p class="card-text">${element.text}</p>
    <button type="button" class="btn btn-primary bot-button" id="${element.id}">X</button>
    </div>`
  })
  taskArea.innerHTML = htmlList;
}

renderTaskBox();

const createTask = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.id = "exampleModal";
  modal.tabIndex = "-1";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", "exampleModalLabel");
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Новая задача</h5>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Название</label>
              <input type="text" class="form-control new-task-title" id="recipient-name">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Сообщение</label>
              <textarea class="form-control new-task-content" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary close" data-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-primary create-button">Создать</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.classList.add("show", "d-block");

  const closeButton = modal.querySelector(".close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.classList.remove("show", "d-block");
    });
  }

  const createButton = modal.querySelector(".create-button");
  if (createButton) {
    createButton.addEventListener("click", () => {
      const title = modal.querySelector(".new-task-title");
      const content = modal.querySelector(".new-task-content");
      if (title.value && content.value) {
        modal.classList.remove("show", "d-block");
        console.log(title.value, content.value); ////////////////////////////////////////////////////Получение данных нового таска///////////////////////////////////////////////////////
      }
    });
  }
};

addTask.addEventListener("click", createTask);
