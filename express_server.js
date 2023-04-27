//modules
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const THREE = require("three");
const { roomsDatabase, camerasDatabase, usersDatabase } = require("./database");
const {
  createChair,
} = require("/Users/stephanierowe/cms_bnd/cms_bnd/views/chair1.js");

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
  console.log("sessionListner", req.session);
  next();
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
app.use(express.urlencoded({ extended: true }));

//get routes
app.get("/", (req, res) => {
  res.render("login_page");
});

app.get("/login", (req, res) => {
  let userNow = usersDatabase[req.session.userId]
  console.log("/login", userNow)
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
  res.render("camera2_page");
});

// app.get("/camera1", (req, res) => {
//   res.render("camera1_page");
// });

//post routes
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let userId = "";
  for (let id in usersDatabase) {
    if (usersDatabase[id]["email"] === email) {
      userId = usersDatabase[id]["id"];
    }
  }
  if (userId === "") {
    return res
      .status(403)
      .send(
        "Please Confirm You Have Entered The Correct Username And Password"
      );
  }
  if (password !== usersDatabase[userId]["password"]) {
    return res
      .status(403)
      .send(
        "Please Confirm You Have Entered The Correct Username And Password"
      );
  }
  req.session.userId = userId;
  res.redirect("/dashboard");
});

app.post("/logout", (req, res) => {
  delete req.session.userId;
  res.redirect("/login");
});
