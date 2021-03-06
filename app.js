const express = require("express");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const session = require("express-session");


app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Sessions
//Enable sessions
app.use(
    session({
        name: "SID",
        secret: "#$_Æ@",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
            secure: false
        }
    })
);

hbs.registerPartials(path.join(__dirname, "/views/partials"));

// Routes
const indexRouter = require("./routes");
const dashboardRouter = require("./routes/dashboard");

app.use("/", indexRouter);
app.use("/dashboard", dashboardRouter);

// Server startup
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
app.listen(port, function() {
    console.log("Express server is running on port: ", port);
});