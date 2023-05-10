const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req , res){
  res.sendFile(__dirname + "/index.html")
});


app.post("/" , function(req , res){
  const query = req.body.cityName
  const apikey = process.env.API_KEY;
  const url = "https://api.weatherapi.com/v1/current.json?key=" + apikey + "&q=" + query + "&aqi=no"

https.get(url , function(response){
  console.log(response.statusCode);

  response.on("data" , function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.current.temp_c
    const weatherDescription = weatherData.current.condition.text
    const icon = weatherData.current.condition.icon
    const imageUrl = "//cdn.weatherapi.com/weather/64x64/night/116.png"
    res.write("<p>The weather is currently " + weatherDescription +"</p>")
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>")
    res.write("<img src=" + imageUrl + ">")
    res.send()
  });
});
});


app.listen(3000 , function(){
  console.log("Server is running on port 3000");
});
