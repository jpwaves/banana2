const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'kitty2328', // REPLACE THIS TO WORK
    database: 'banana',
});

app.post('/create', (req, res) => {
    const name = req.body.username;
    const pass = req.body.password;
    const role = "user";

    db.query(
        'INSERT INTO appuser (username, passwd, role) VALUES (?, ?, ?)', 
        [name, pass, role],
        function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.send("Registered");
            }
        });
});

app.listen(3001, () => {
    console.log("yay");
});