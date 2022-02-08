const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { map, weather } = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const commonPath = path.join(__dirname, "../common");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(commonPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    message: "Imakit Michael",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Here is some helpful information",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    message: "assets/bg2.jpg",
  });
});

app.get("/weather", async (req, res) => {
  try {
    if (req.query.address) {
      const weatherData = await weather(req.query.address);
      const mapData = await map(req.query.address);
      res.render("weather", {
        title: "Results",
        data: {
          weather: weatherData,
          location: mapData,
        },
      });
    } else {
      res.send({ error: "You must include an Address" });
    }
  } catch (e) {
    console.log("Error", e);
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Article Not Found",
    message: "Try again!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    message: "You are Lost!",
  });
});

app.listen(3000, () => {
  console.log("Server Running --------- Port 3000");
});
