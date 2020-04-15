'use strict'

const userForm = new UserForm();

//  Log In

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        response.success ? location.reload() : userForm.setLoginErrorMessage(response.data);
        console.log(response);
    });
}


//  Register 

userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        response.success ? location.reload() : userForm.setRegisterErrorMessage(response.data);
        console.log(response);
    });
}

// login: oleg@demo.ru, password: demo
// login: ivan@demo.ru, password: demo
// login: petr@demo.ru, password: demo
// login: galina@demo.ru, password: demo
// login: vladimir@demo.ru, password: demo
