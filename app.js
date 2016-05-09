var express = require("express");
var http = require("http");
var io = require("socket.io");
var server = null;
var app = express();
const PORT = 8080;
var viwersCount = 0;

function startIO(server)
{
    io = io.listen(server);

    io.sockets.on('connection', function (socket){
        socket.on('disconnect', () => {
            console.log('User disconnect');
            viwersCount--;
            socket.broadcast.emit('conex', viwersCount);
        });
        socket.on('data', data => socket.broadcast.emit('data', data));
        socket.on('conex', () => {
            viwersCount++;
            socket.broadcast.emit('conex', viwersCount);
        });
        socket.on('disconex', () => {
            viwersCount--;
            socket.broadcast.emit('conex', viwersCount);
        });
    });
}

app.use("/assets", express.static("public"));
app.set("view engine", "jade");

app.get("/", (req, res) => res.render("index"));
app.get("/emit", (req, res) => res.render("emit"));
app.get("/show", (req, res) => res.render("show"));

server = http.createServer(app).listen(PORT, () => console.log("Express server listening on port " + PORT));

startIO(server);
