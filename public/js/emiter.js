$(function(){
    var status = document.getElementById("status");
    var socket = null;

    function log(message)
    {
        status.innerHTML = status.innerHTML + message + "<br />";
    }

    socket = io.connect(window.document.location.host);
    socket.on("connect", () => log("Conectado"));
    socket.on("disconnect", () => log("Desconectado"));
    socket.on('conex', data => $(".viwersCount").text("Viwers: " + data));

    function emitText(message)
    {
        socket.emit('data', message);
    }

    $(".text").on("keyup", function(){
        status.innerHTML = "Transmitiendo...";
        this.on("keydown", function(){
            log("Conectado");
        });
        emitText(this.value);
    });
});



