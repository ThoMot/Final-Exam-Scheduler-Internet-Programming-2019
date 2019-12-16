const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const saltRounds = 5;

router.get("/", function(req, res) {
    res.render("index", {
        title: "Scheduler App",
        btnName: "Dashboard",
        link: "window.location.href='/dashboard'",
        username: req.session.userName
    });
});

function inputValidation(inputs) {
    return inputs.map(function(field, index) {
        if (!field) {
            inputs[index] = null;
        }
    });
}

router.get("/logout", function(req, res) {
    if (req.session.userName) {
        req.session.destroy();
    }
    res.json({
        successful: true,
        message: ""
    });
});

router.post("/signup", function(req, res) {
    const {
        firstname,
        lastname,
        email,
        password,
    } = req.body;

    bcrypt.hash(password, saltRounds, function (err, hash) {

        const inputs = [
            firstname,
            lastname,
            email,
            hash
        ];

        inputValidation(inputs);

        let sql =
            "INSERT INTO user (firstName, lastName, email, password) VALUES (?)";

        sql = mysql.format(sql, [inputs]);

        const connection = createConnection();

        connection.query(sql, function (error, result, fields) {
            if (error) {
                console.error(error);
                if (error.errno = 1062) {
                    res.json({
                        status: "unsuccessful",
                        message: "Username already taken"
                    });
                }
            } else if (result) {
                res.json({
                    status: "success",
                    message: `New user added with id: ${result.insertId}`
                });
            } else {
                res.json({
                    status: "unsuccessful",
                    message: "Creation failed"
                });
            }
        });
    });
});

router.post("/signin", function(req, res) {
    const {
        email,
        password,
    } = req.body;

    let sql =
        "SELECT `password`, `firstname`, `id` FROM `user` WHERE `email` = ?";

    sql = mysql.format(sql, email);
    const connection = createConnection();

    connection.query(sql, function(error, result, fields) {
        if (error){
            console.error(error);
            if(error.errno = 1062) {
                res.json({
                    status: "unsuccessful",
                    message: "Username already taken"
                });
            }
        } else if (result) {
            bcrypt.compare(password, result[0].password, function (err, response) {
                    if (response) {
                        req.session.userId = result[0].id;
                        req.session.userName = result[0].firstname;
                        res.json({
                            status: "success",
                            message: `Login Successful`
                        });
                    } else {
                        res.json({
                            status: "unsuccessful",
                            message: "Login failed"
                        });
                    }
                }
            );
        }
    });
});


module.exports = router;