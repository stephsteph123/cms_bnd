const express = require('express')
const app = express()
const PORT = 3000;
const bodyParser = require('body-parser');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//get routes
app.get("/login", (req, res) => {
  let email = '';
  res.render("login_page");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard_page");
});


//post routes
app.post("/login", (req, res) => {
  console.log(req.body.email)
  console.log(req.body.password)

  res.redirect("/dashboard")
})