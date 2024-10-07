const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*', // Allow all origins for testing purposes
        methods: ['GET', 'POST']
    }
});
const cors = require('cors');
app.use(cors());

// When a client connects
// When a client connects
io.on('connection', (socket) => {
    console.log('A client connected');

    // Example: Receive GPS data from ESP8266 and broadcast it
    socket.on('gpsData', (data) => {
        console.log('Received GPS Data: ', data);
        io.emit('gpsData', data); // Broadcast the GPS data to all clients
    });

    // When the client disconnects
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
