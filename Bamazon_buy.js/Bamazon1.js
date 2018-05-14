var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

inquirer.prompt([
    {
        type: "checkbox",
        message: "What would you like to do?",
        choices: ["Post an Item", "Bid on an Item", "Exit"],
        name: "options"
    }
]

).then(function (inquirerResponse) {
    if (inquirerResponse.options == "Post an Item") {
        postItem();
    } else if (inquirerResponse.options == "Bid on an Item") {
        bidItem();
    } else {
        return
    };
})

function postItem() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of your product you like to buy?",
            name: "product_name"
        },
        // {
        //     type: "input",
        //     message: "In a few words, describe the product you are looking to sell.",
        //     name: "description"
        // },
        {
            type: "input",
            message: "How many of these units of the product you would like to buy?",
            name: "stock_quantity"
        },
        // {
        //     type: "input",
        //     message: "How much are you looking to sell your item for?",
        //     name: "price"
        // },
    ]).then(function (inquirerResponse) {
        var query = connection.query(
            "INSERT INTO items SET ?",
            {
                name: inquirerResponse.product_name,
                description: inquirerResponse.department_name,
                qty: inquirerResponse.stock_quantity,
                price: inquirerResponse.price
            },
            function (err, res) {
                console.log(res.affectedRows + " Insufficient quantity!");
                // Call updateProduct AFTER the INSERT completes
            }
        );
    })
}

function bidItem() {
        connection.query("SELECT * FROM items", function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log(res);
          var products = [];
          for (var i =0;i < res.length; i++){
            products.push(res[i].name)
          }
          console.log(products);
          inquirer.prompt([
              { type: "input",
              message: "What is the ID of your product you like to buy?",
              name: "product_name"
              },
              {type: "input",
              message: "How many of these units of the product you would like to buy?",
              name: "stock_quantity"
              },
            //   {type: "input",
            //   message: "How many of these items would you like to purchase?",
            //   name: "quantityBid",
            //   },
          ])
        });
      }



