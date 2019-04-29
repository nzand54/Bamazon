var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Default",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  queryGroceryStoreItems();
  //   start();
});

function queryGroceryStoreItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");

  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "What is the ID of the product you would like to purchase?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units would you like to purchase?"
      }
    ]) .then(function(ans) {
        console.log(ans.productID);
        console.log(ans.units);
      });
  });
}

