$(function(){
    var reciver = document.getElementById("reciver");
    var status = document.getElementById("status");
    var socket = null;

    socket = io.connect(window.document.location.host);
    socket.on('connect', () => {
        log('Conectado');
        socket.emit('conex');
    });
    socket.on('disconnect', () => {
        log('Desconectado')
        socket.emit('disconex');
    });
    socket.on('data', data => putMessage(data));

    function log(message)
    {
        status.innerHTML = status.innerHTML + message + "<br/>";
    }

    function putMessage(message)
    {
        $("#reciver").text("" + message);
    }
});
