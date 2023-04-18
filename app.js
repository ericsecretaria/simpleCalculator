//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const { expression } = req.body;

  const components = expression.split(' ');
  const num1 = parseFloat(components[0]);
  const operator = components[1];
  const num2 = parseFloat(components[2]);

  let result;

  // Check if the input values are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    result = 'Invalid input values';
  } else {
    // Perform the calculation based on the operator
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        result = 'Invalid operator';
        break;
    }
  }

  // Send the result back to the client
  res.send(`<input type="text" id="expression" name="expression" value="${expression} = ${result}" required><br><br>`);
});

app.listen(3000, function(){
  console.log("The server is running at port 3000");
});
