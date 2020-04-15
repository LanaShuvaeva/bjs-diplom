'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        response.success ? location.reload() : console.error("Error: this user is not registered");
        console.log(response);
    });
}



// login: oleg@demo.ru, password: demo
// login: ivan@demo.ru, password: demo
// login: petr@demo.ru, password: demo
// login: galina@demo.ru, password: demo
// login: vladimir@demo.ru, password: demo