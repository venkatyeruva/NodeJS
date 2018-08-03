const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const http = require('http');
const socketIO = require('socket.io');
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

var allSockets = [];
var customers = [];

io.on("connection", (socket) => {
    allSockets.push(socket);
    console.log("Client Connected...");
    socket.emit("data", "Some data...");
    socket.on("disconnect", (socket) => {
        allSockets = [];
        console.log("Client disonnected...");
    })
})

function initData() {
    customers.push(
    { id: 1, name: "Google", location: "Bangalore"},
    { id: 2, name: "Google", location: "Bangalore"},
    { id: 3, name: "Google", location: "Bangalore"},
    { id: 4, name: "Google", location: "Bangalore"})
}
initData();

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.status(200);
    res.write("Node Express REST API's");
    res.end();
})

app.post("/customers", (req, res) => {
    var customer = req.body;
    try {
        if (customer.id <= 0) {
            //Bad Request
            res.status(400);
            res.json(null);
        } else {
            customers.push(customer);
            allSockets.forEach(socket => {
                socket.emit("newCustomer", customer);
            })
            res.status(201);
            res.setHeader("location", "customers/" + customer.id);
            res.json(null);
        }
    } catch (error) {
        res.status(503);
        res.json(null);
    }
})

app.get("/customers", (req, res) => {
    res.json(customers);
})

app.get("/customers/:id", (req, res) => {
    var id = req.params.id;
    var filteredCustomers = customers.filter((item) => item.id == id);
    if (filteredCustomers[0]) {
        res.json(filteredCustomers[0]);
    } else {
        res.status(404);
        res.json(null);
    }
})

var port = process.env.PORT || 8090
httpServer.listen(port, () => {
    console.log("rest API server started")
})