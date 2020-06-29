const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res)
{
     res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res)
{

    const query = req.body.cityName;
    const apiKey = "API_KEY";
    const unit = "metric";
    const apiURL = "";
    https.get(apiURL, function(response) 
    {
        console.log(response.statusCode);
        
        response.on("data", function(data)
        {
            const apiData = JSON.parse(data);
            const temperature = apiData.main.temp;
            const weatherDescrip = apiData.weather[0].description;
            const weatherIcon = apiData.weather[0].icon;
            const weatherIconURL = "http://openweathermap.org/img/wn/" +weatherIcon +"@2x.png";
            res.write("<h1>The temperature in " +query + " is " +temperature + " degress celcious.</h1>");
            res.write("<p>The weather condition is " +weatherDescrip +".</p>");
            res.write("<img src= " +weatherIconURL +">");
            res.send();
        })
    });
})

app.listen(3000, function()
{
    console.log("Server running on port 3000");    
});
