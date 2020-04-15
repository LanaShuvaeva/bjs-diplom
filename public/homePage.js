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

moneyMng.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        response.success ? ProfileWidget.showProfile(response.data)
            : moneyMng.setMessage(!response.success, response.data);
        console.log(response);
    })
}

moneyMng.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        response.success ? ProfileWidget.showProfile(response.data)
            : moneyMng.setMessage(!response.success, response.data);
        console.log(response);
    })
}


//  Widget - Favorites

const favsWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favsWidget.clearTable();
        favsWidget.fillTable(response.data);
        moneyMng.updateUsersList(response.data);
        console.log(response);
    }
});

favsWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favsWidget.clearTable();
            favsWidget.fillTable(response.data);
            moneyMng.updateUsersList(response.data);
            favsWidget.setMessage(response.success);
            response.data = "You just successfully added new fav user";
            favsWidget.setMessage(response.success, response.data);
            console.log(response);
            console.log(data);
        }
        favsWidget.setMessage(!response.success, response.data);
        console.log(response);
        console.log(data);
    })
}

favsWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favsWidget.clearTable();
            favsWidget.fillTable(response.data);
            moneyMng.updateUsersList(response.data);
            favsWidget.setMessage(response.success);
            response.data = "You just successfully deleted a user";
            favsWidget.setMessage(response.success, response.data);
            console.log(response);
            console.log(data);
        }
        favsWidget.setMessage(!response.success, response.data);
        console.log(response);
        console.log(data);
    })
}