
const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const users = [{ id: 1, email: "user@example.com", password: "$2b$10$N1JZnE/v/a5G6jKc5/kZ/u5vYj/KW8Gc33i5Qy1mjKU5M6P9o5H5K" }];

app.post("/login", (req, res) => {

const { email, password } = req.body;

const user = users.find((u) => u.email === email);

if (!user) return res.status(401).send("Email or password is incorrect");

const isPasswordCorrect = bcrypt.compareSync(password, user.password);

if (!isPasswordCorrect) return res.status(401).send("Email or password is incorrect");

const token = jwt.sign({ userId: user.id }, "mysecretkey");

res.send(token);

});

app.get("/items", (req, res) => {

const items = [{ id: 1, name: "item1" }, { id: 2, name: "item2" }];

const token = req.headers.authorization;

if (!token) return res.status(401).send("Access denied. No token provided.");

try {

const decoded = jwt.verify(token, "mysecretkey");

res.send(items);

} catch (ex) {

res.status(400).send("Invalid token.");

}

});

app.listen(3000, () => console.log("Listening on port 3000…"));