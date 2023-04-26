const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const {
  roomsDatabase,
  camerasDatabase,
  usersDatabase,
} = require("./database");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login_page");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//get routes
app.get("/login", (req, res) => {
  res.render("login_page");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard_page");
});

app.get("/camera2", (req, res) => {
  res.render("camera2_page");
});

//post routes
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let userId = "";
  for (let id in usersDatabase) {
    if (usersDatabase[id]["email"] === email) {
      userId= usersDatabase[id]["id"];
    }
  }
  console.log(userId)
  if (userId === "") {
    return res.status(403).send('Please Confirm You Have Entered The Correct Username And Password');
  }
  if(password !== usersDatabase[userId]["password"]){
    return res.status(403).send('Please Confirm You Have Entered The Correct Username And Password');
  }

  res.redirect("/dashboard");
  });