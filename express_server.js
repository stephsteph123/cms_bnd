//modules
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { camerasDatabase, usersDatabase } = require("./database");
const bcrypt = require('bcrypt');

//middlewear
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["secret key"],
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  // console.log("sessionListner", req.session);
  next();
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
app.use(express.urlencoded({ extended: true }));


//helper function
async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

(async () => {
  const hashedPassword = await hashPassword("Test1234!");
  console.log(hashedPassword);
})();

//get routes
app.get("/", (req, res) => {
  res.render("login_page");
});

app.get("/login", (req, res) => {
  let userNow = usersDatabase[req.session.userId]
  if (userNow){
    res.redirect("/dashboard")
  } else {
  templateVars = {user: userNow}
  req.session.error = null;
  res.render("login_page", templateVars);
  }
});

app.get("/dashboard", (req, res) => {
  let userNow = usersDatabase[req.session.userId];
  if (userNow) {
    templateVars = {user: userNow}
    res.render("dashboard_page", templateVars);
  } else {
    res.redirect("/login");
  }
});

app.get("/camera2", (req, res) => {
  let userNow = usersDatabase[req.session.userId];
  if (userNow) {
  camStatus = camerasDatabase.c2.status
  templateVars = {user: userNow, status: camStatus}
  res.render("camera2_page", templateVars);
  } else {
    res.redirect("/login");
  }
});

app.get("/camera1", (req, res) => {
  let userNow = usersDatabase[req.session.userId];
  if (userNow) {
  camStatus = camerasDatabase.c1.status
  camNoise = camerasDatabase.c1.noise
  camMove = camerasDatabase.c1.movement
  templateVars = {user: userNow, status: camStatus, noise: camNoise, movement: camMove}
  res.render("camera1_page", templateVars);
  } else {
    res.redirect("/login");
  }
});


app.get("/pastfeed", (req, res) => {
  let userNow = usersDatabase[req.session.userId];
  if (userNow) {
  res.render("past_feed");
  } else {
    res.redirect("/login");
  }
});

app.get("/offline", (req, res) => {
  let userNow = usersDatabase[req.session.userId]
  if (userNow){
    res.render("camera_offline")
  } else {
  templateVars = {user: userNow}
  req.session.error = null;
  res.render("login_page", templateVars);
  }
});
app.get("/motion", (req, res) => {
  let userNow = usersDatabase[req.session.userId]
  if (userNow){
    res.render("motion_detected")
  } else {
  templateVars = {user: userNow}
  req.session.error = null;
  res.render("login_page", templateVars);
  }
});
app.get("/sound", (req, res) => {
  let userNow = usersDatabase[req.session.userId]
  if (userNow){
    res.render("sound_detected")
  } else {
  templateVars = {user: userNow}
  req.session.error = null;
  res.render("login_page", templateVars);
  }
});

//post routes
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let userId = "";
  for (let id in usersDatabase) {
    if (usersDatabase[id]["email"] === email) {
      userId = usersDatabase[id]["id"];
    }
  }
  if (userId === "") {
    return res.status(403).send("user has to register");
  }
  const hashedPassword = usersDatabase[userId]["password"]; 
  if (!await bcrypt.compare(password, hashedPassword)) {
    return res.status(403).send("wrong password");
  }
  req.session.userId = userId;
  req.session.error = null;
  req.body.email = email;
  res.redirect("/dashboard");
});


app.post("/logout", (req, res) => {
  delete req.session.userId;
  res.redirect("/login");
});
