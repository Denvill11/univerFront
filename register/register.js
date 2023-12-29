const registerButton = document.getElementById("button-register");
const inputEmail = document.getElementById("exampleInputEmail1");
const inputPassword = document.getElementById("exampleInputPassword1");
const inputPasswordAdmin = document.getElementById("exampleInputPasswordAdmin");
const errorLabel = document.getElementById("error-label");

const REGISTER_URL = "http://localhost:5000/auth/registration";

const changePage = async () => {
  try {
    const value = {
      email: inputEmail.value,
      password: inputPassword.value,
      role: inputPasswordAdmin.value,
    };

    const res = await fetch(REGISTER_URL, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if(res.ok) {
    const { token, role } = await res.json();
      localStorage.setItem("token", token);
      if(role == 'user') {
        window.location.href = "../userMainPage/userMainPage.html";
      } else {
        window.location.href = "../adminMainPage/adminMainPage.html";
      }
    } else {
      throw new Error('Что-то пошло не так');
    }
  } catch (e) {
    console.log(e);
    errorLabel.textContent = String(e.message);
  }
};

registerButton.addEventListener("click", changePage);
