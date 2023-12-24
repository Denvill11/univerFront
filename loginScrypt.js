const registerButton = document.getElementById('button-register')
const logginButton = document.getElementById('button-loggin')

const changePageRegister = () => { 
  window.location.href = 'register/register.html';
}

const changePageLoggin = () => { 
  window.location.href = 'adminMainPage/adminMainPage.html';
}

registerButton.addEventListener('click', changePageRegister)
logginButton.addEventListener('click', changePageLoggin)