const socket = io();
const inputs = document.getElementsByClassName('agregar');

var myFunction = function () {
    var attribute = this.getAttribute("data-id");
    socket.emit('message2', attribute);
};


Array.from(inputs).forEach(function (element) {
    element.addEventListener('click', myFunction);
});



socket.on('log', data => {
    let logs = '';
    data.logs.forEach(log => {
        logs += `${log.socketid} dice: ${log.message}<br/>`
    })
    log.innerHTML = logs;
});

