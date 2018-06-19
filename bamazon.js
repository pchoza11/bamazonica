var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "PaulChoza!",
    database: "bamazon_db"

});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("Connection is " + connection.threadId);
    listItems(buy);

});
console.log("\n# WELCOME TO BAMAZON! # WELCOME TO BAMAZON! # WELCOME TO BAMAZON! #\n")

function listItems(x){
    var query = connection.query("SELECT * FROM goods", function (err, res) {
        console.log("\n >>>>>>>>>>>>>>>>>>>> ### THE MERCHANDISE ### <<<<<<<<<<<<<<<<<<<<<<<\n\n")
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID " + res[i].id + " | " + res[i].item_name + " ($" + res[i].price + ") | " + res[i].item_category + " | Qty: " + res[i].item_quant + "\n");
        }
        x();
    });

//console.log(query.sql);

}
function buy (){

    inquirer.prompt([
        {
        type: "confirm",
        message: "See anything you like?",
        name: "start"
        }
    ]).then(function(answer){
        if (answer.start){
            inquirer.prompt([

                {
                    type: "input",
                    message: "What would you like to buy? (Enter product ID)\n",
                    name: "selection"
                },

                {
                    type: "input",
                    message: "Enter quantity\n",
                    name: "quantity"
                }
            ]).then(function (answer) {
                var query = connection.query("SELECT * FROM goods WHERE id=" + answer.selection, function (err, res) {
                    var selectedItem = answer.selection;
                    var selectedQty = answer.quantity;
                    if (res[0].item_quant >= selectedQty) {
                        var query = connection.query("UPDATE goods SET ? WHERE ?",

                            [
                                {
                                    item_quant: (res[0].item_quant - answer.quantity)
                                },
                                {
                                    id: selectedItem
                                }

                            ],

                            console.log("Sweet! You have been charged $" + (res[0].price * selectedQty) + ".  Have a nice day!")

                        );
                        buy();
                    }

                    else {
                        console.log("Insufficient Quantity!\n");
                        buy();
                    }



                })
            })
        
        }
        else {
            console.log("Thank you, come again.")
            connection.end();
            console.clear();

        }
    })

        
}
