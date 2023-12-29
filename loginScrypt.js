const registerButton = document.getElementById("button-register");
const logginButton = document.getElementById("button-loggin");
const inputPassword = document.getElementById("input-password");
const inputEmail = document.getElementById("input-email");
const errorLabel = document.getElementById("error-label");

const LOGGIN_URL = "http://localhost:5000/auth/login";

const changePageLoggin = async () => {
  try {
    const value = {
      email: inputEmail.value,
      password: inputPassword.value,
    };
    const res = await fetch(LOGGIN_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    if (res.ok) {
      const { token, role } = await res.json();
      localStorage.setItem("token", token);
      if (role == "user") {
        window.location.href = "../userMainPage/userMainPage.html";
      } else {
        window.location.href = "../adminMainPage/adminMainPage.html";
      }
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
    errorLabel.textContent = String("Неверные данные");
  }
};

const changePageRegister = () => {
  window.location.href = "register/register.html";
}

registerButton.addEventListener("click", changePageRegister);
logginButton.addEventListener("click", changePageLoggin);
