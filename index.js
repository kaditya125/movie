const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongodb");

const tempelatesPath = path.join(__dirname, 'tempelates');
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatesPath);
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index"); 
});

app.get("/signup", (req, res) => {
    res.render("index"); 
});

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            res.redirect("/");
        } else {
            const newUser = {
                username,
                email,
                password,
            };

            await collection.create(newUser);

            res.redirect("/index.html");
        }
    } catch (error) {
        console.error(error);
        res.send("Error during signup");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await collection.findOne({ email });

        if (user) {
            if (user.password === password) {
                return res.redirect("/index.html");
            } else {
                return res.redirect("/");
            }
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.send("Error during login");
    }
});