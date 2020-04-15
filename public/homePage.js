'use strict'

const logOutButton = new LogoutButton();

logOutButton.action = () => {
    ApiConnector.logout(response => {
        response.success ? location.reload() : console.error("Error: something went wrong");
        console.log(response);
    });
}
