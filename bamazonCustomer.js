var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Default",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  queryGroceryStoreItems();
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

