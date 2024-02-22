const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/d3f9953f9b";
  const options = {
    method:"POST",
    auth:"alex1:6cbd041fe4613437b7fb3aa1fa4975a2-us17"
  };
  const request=https.request(url, options, function (response) {
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(3000, function () {
  console.log("Server running on port 3000!");
});

//API Key
// 6cbd041fe4613437b7fb3aa1fa4975a2-us17

//List ID
// d3f9953f9b
