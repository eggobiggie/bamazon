const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId);
});

//Function to display the product information from mySQL maybe with a message

function displayAll () {
    connection.query(
        'SELECT * FROM `products`',
        function(err, results, fields) {
            console.log("\nCurrent Products Availabe: \n");
            for (i = 0; i < results.length; i++) {
                console.log("Product ID: " + results[i].id + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: $" + results[i].price); // results contains rows returned by server
            }
        }
    );
}

displayAll();
   

