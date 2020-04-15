'use strict'

//  Log Out 

const logOutButton = new LogoutButton();

logOutButton.action = () => {
    ApiConnector.logout(response => {
        response.success ? location.reload() : console.error("Error: something went wrong");
        console.log(response);
    });
}


//  Profile Widget 

ApiConnector.current(current => {
    current.success ? ProfileWidget.showProfile(current.data) : console.error("Error: something went wrong");
    console.log(current);
});


//   Rates Board   

const newRatesBoard = new RatesBoard();

function fillRatesBoard() {
    ApiConnector.getStocks(response => {
        if (response) {
            newRatesBoard.clearTable();
            newRatesBoard.fillTable(response.data);
        }
    });
}

setInterval(fillRatesBoard, 60000);


//  Money Manager

const moneyMng = new MoneyManager();

moneyMng.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
     response.success ? ProfileWidget.showProfile(response.data) 
      : moneyMng.setMessage(!response.success, response.data);
      console.log(response);
    })
  }
  