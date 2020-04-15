'use strict'

// _____________________________ Log Out _____________________________ 

const logOutButton = new LogoutButton();

logOutButton.action = () => {
    ApiConnector.logout(response => {
        response.success ? location.reload() : console.error("Error: something went wrong");
        console.log(response);
    });
}


// _____________________________  Profile Widget _____________________________ 

ApiConnector.current(current => {
    current.success ? ProfileWidget.showProfile(current.data) : console.error("Error: something went wrong");
    console.log(current);
});


// _____________________________  Rates Board _____________________________ 

const newRatesBoard = new RatesBoard();

function fillRatesBoard() {
    ApiConnector.getStocks(response => {
        if (response) {
            newRatesBoard.clearTable();
            newRatesBoard.fillTable(response.data);
        }
    });
}

setInterval(function(){fillRatesBoard();}, 60000);


