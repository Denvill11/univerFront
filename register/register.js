const registerButton = document.getElementById('button-register');
const inputEmail = document.getElementById('exampleInputEmail1');
const inputPassword = document.getElementById('exampleInputPassword1');
const inputPasswordAdmin = document.getElementById('exampleInputPasswordAdmin');

const changePage = async () => {
  try {
    const value = {
      email: inputEmail.value,
      password: inputPassword.value,
      role: inputPasswordAdmin.value,
    }
    const response = await fetch('http://localhost:5000/auth/registration', {
      method: 'POST', 
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    console.log(response.json());
    localStorage.setItem('data', 'vale');
    window.location.href = '../userMainPage/userMainPage.html';
  } catch(e) { 
    alert(2);
    console.log(e);
  }
}

registerButton.addEventListener('click', changePage)