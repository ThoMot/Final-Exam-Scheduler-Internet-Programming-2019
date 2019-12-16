const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");

router.get("/", function(req, res) {
    if(req.session.userId) {
        res.render("dashboard", {
            title: "Scheduler App",
            link: "window.location.href='/'",
            btnName: "FrontPage",
            username: req.session.userName
        });
    } else {
        res.redirect("/");
    }
});

router.get("/appointment/:id", function(req, res) {
    const connection = createConnection();
    req.session.test = "status fra appointment";
    const sql =
        "SELECT A.*, TIMESTAMPDIFF(MINUTE, A.start_time, A.end_time) AS duration FROM appointment as A WHERE A.id = ?";

    const id = [req.params.id];

    connection.query(sql, id, function(err, result, fields) {
        if (err) {
            res.json(err);
        }
        if (result) {
            if (result.length === 1) {
                result.map(appointment => {
                    // Formatting sql date object into YYYY-MM-DD format
                    appointment.date = appointment.start_time.toDateString();
                    appointment.end_time = appointment.end_time.toLocaleTimeString();
                    appointment.start_time = appointment.start_time.toLocaleTimeString();
                });
                res.json({
                    status: "success",
                    appointment: result[0]
                });
            } else {
                res.json({
                    status: "unsuccessful",
                    message: "No matches for given search"
                });
            }
        }
    });

    connection.end();
});


router.get("/fetchAppointments/:id", function(req, res, next) {
    const connection = createConnection();
    const sql =
        "SELECT A.*, TIMESTAMPDIFF(MINUTE, A.start_time, A.end_time) AS duration FROM appointment as A WHERE A.owned_by = ? AND start_time >= date(curdate() - INTERVAL 8 HOUR) ORDER BY duration";
    const owned_by = [req.params.id];

    connection.query(sql, owned_by, function(err, result, fields) {
            if (err) {
                console.log(err);
                res.json({
                    status: "error",
                    message: "Error retrieving appointments"
                });
            } else{
                result.map(appointment => {
                    // Formatting sql date object into YYYY-MM-DD format
                    appointment.date = appointment.start_time.toDateString();
                    appointment.start_time = appointment.start_time.toLocaleTimeString();
                });


                res.json({
                    status: "success",
                    appointments: result
                });
            }
        }
    );
    connection.end();
});

router.get("/logout", function(req, res) {
    if (req.session.userName) {
        req.session.destroy();
    }
    res.json({
        successful: true,
        message: ""
    });
});


module.exports = router;