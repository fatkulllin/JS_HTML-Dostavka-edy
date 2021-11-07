let buttonAuth = document.querySelector('.button-auth')
let modalAuth = document.querySelector('.modal-auth')
let buttonOut = document.querySelector('.button-out')
let userName = document.querySelector('.user-name')
let closeAuth = document.querySelector('.close-auth')
let loginForm = document.getElementById('logInForm')
let inputLogin = document.getElementById('login')
let inputPassword = document.getElementById('password')

let login = user => {
    buttonAuth.style.display = 'none'

    buttonOut.style.display = 'flex'
    userName.style.display = 'flex'

    userName.textContent = user.login
    modalAuth.style.display = 'none'
}

let logout = () => {
    buttonAuth.style.display = 'flex'

    buttonOut.style.display = 'none'
    userName.textContent = ''
    userName.style.display = 'none'
    localStorage.removeItem('user')
}

buttonAuth.addEventListener('click', () => {
    modalAuth.style.display = 'flex'
})

closeAuth.addEventListener('click', () => {
    modalAuth.style.display = 'none'
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (inputLogin.value != ''&& inputPassword.value != '') {
        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }
        login(user)
    } else {
        alert('Логин\/пароль не введен')
    }


    localStorage.setItem('user', JSON.stringify(user))
})

buttonOut.addEventListener('click', () => {
    logout()
})

if (localStorage.getItem('user')) {
    login(JSON.parse(localStorage.getItem('user')))
}