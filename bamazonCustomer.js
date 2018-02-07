const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log('Connected as id ' + connection.threadId);
// });

//Function to display the product information from mySQL maybe with a message
function displayAll () {
    connection.query('SELECT * FROM `products`', function(err, results, fields) {
        if (err) throw err;
            console.log("\nCurrent Products Availabe: \n");
            for (i = 0; i < results.length; i++) {
                console.log("Product ID: " + results[i].id + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: $" + results[i].price); // results contains rows returned by server
            }
            whichProduct();
        }
    );
}

displayAll();

//inquirer for asking customer what they would like to buy:
function whichProduct() {
    
    inquirer.prompt([
        {
            type: "input",
            message: "\nWhich product (ID) would you like to purchase today?",
            name: "product"
        },
        {
            type: "input",
            message: "\nHow many?",
            name: "quantity"
        }
    ]).then(answers => {
        connection.query('SELECT `id` FROM `products`', function(err, results, fields) {
            if (err) throw err;
            let productResponse;
                for (i = 0; i < results.length; i++) {
                    if (results[i].id === parseInt(answers.product)) {
                        productResponse = results[i].id;
                        console.log("Response is " + productResponse);
                    }
                }
            }
        );
    });
}



   

