const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const fileName = 'items.txt';
const filePath = path.join(__dirname, fileName);

let items = fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8').trim() !== '' ? fs.readFileSync(filePath, 'utf-8').split(",") : [];

app.get("/", function(req, res) {
    const today = new Date();
    const date = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    const day = today.toLocaleDateString("en-US", date);
    res.render("list", {
        day: day,
        items: items
    });
});

app.post("/", function(req, res) {
    const action = req.body.action;
    if (action === 'add') {
        const item = req.body.newItem.trim(); // Remove leading/trailing whitespaces
        if (item !== "") {
            items.push(item);
            fs.appendFileSync(filePath, ',' + item);
        }
    } else if (action === 'delete') {
        const itemIndex = parseInt(req.body.itemIndex);
        items.splice(itemIndex, 1);
        fs.writeFileSync(filePath, items.join(","));
    }
    res.redirect("/")
});


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});