const addTask = document.getElementById("add-task");
const taskArea = document.getElementById("tasks-area");

const users = [
  { email: "test1@gmail.com" },
  { email: "test2@gmail.com" },
  { email: "test3@gmail.com" },
  { email: "test4@gmail.com" },
  { email: "test5@gmail.com" },
  { email: "test6@gmail.com" },
  { email: "test7@gmail.com" },
];

async function getAllTasks() {
  let data = await fetch("http://localhost:5000/admin/all");
  const tasks = await data.json();
  console.log(tasks);
  return tasks;
}

getAllTasks();

const createUserList = () => {
  let user = [];
  users.forEach(({ email }) => {
    user.push(` ${email}`);
  });
  return user;
};

createUserList();

const renderTaskBox = async () => {
  let arrayToRender = await getAllTasks();
  let htmlList = "";
  arrayToRender.forEach((element) => {
    htmlList += `<div class="task" id="${element.id}">
    <h1 class="display-6" id="register-header">${element.name}</h1>
    <p class="card-text">${element.content}</p>
    <button type="button" class="btn btn-danger" id="${element.id}">X</button>
    </div>`;
  });
  taskArea.innerHTML = htmlList;
};

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
    createButton.addEventListener("click", async () => {
      const title = modal.querySelector(".new-task-title");
      const content = modal.querySelector(".new-task-content");
      if (title.value && content.value) {
        modal.classList.remove("show", "d-block");
        const data = {
          name: title.value,
          content: content.value,
        };
        await fetch("http://localhost:5000/admin/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });
      }
      renderTaskBox();
    });
  }
};
async function removeTask(event) {
  const id = event.target.id;
  await fetch(`http://localhost:5000/admin/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  renderTaskBox();
}

taskArea.addEventListener("click", removeTask);
addTask.addEventListener("click", createTask);
