var socket = io.connect('http://localhost:1300');

socket.on('connect', () => {
    console.log(socket.id);
});

// socket.on('news', function (data) {
//     console.log(data);
//     socket.emit('my other event', { my: 'data' });
// });
