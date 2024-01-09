const registerButton = document.getElementById("button-register");
const inputEmail = document.getElementById("exampleInputEmail1");
const inputPassword = document.getElementById("exampleInputPassword1");
const inputPasswordAdmin = document.getElementById("exampleInputPasswordAdmin");
const errorLabel = document.getElementById("error-label");

const REGISTER_URL = "http://localhost:5000/auth";

const checkValidToken = async () => {
  if (token) {
    const res = await fetch(`${LOGGIN_URL}/whoami/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const { role } = await res.json();
      if (role == "user") {
        window.location.href = "../userMainPage/userMainPage.html";
      } else {
        window.location.href = "../adminMainPage/adminMainPage.html";
      }
    } else {
      return;
    }
  }
};

// checkValidToken();

const changePage = async () => {
  try {
    const value = {
      email: inputEmail.value,
      password: inputPassword.value,
      role: inputPasswordAdmin.value,
    };

    const res = await fetch(`${REGISTER_URL}/registration`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if(res.ok) {
    const { token, role } = await res.json();
    console.log(token);
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
