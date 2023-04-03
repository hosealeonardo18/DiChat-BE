require('dotenv').config()
const express = require('express');
const createError = require('http-errors')
const cors = require('cors')
const port = process.env.PORT;
const mainRouter = require('./src/routes/IndexRouter')
const response = require('./src/helper/common')
const { Server } = require('socket.io')
const { createServer } = require('http')

const app = express();
const httpServer = createServer(app)

// socket io
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000', 'https://dichat-be.up.railway.app']
    }
});

// body parse express 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


// cors 
app.use(cors());


app.use('/', mainRouter);
app.use('/img', express.static('src/upload'))
app.all('*', (req, res, next) => {
    next(new createError.NotFound())
})

// init socket io user
const users = {}
io.on(
    'connection',
    (socket) => {
        console.log(`device connect with id = ${socket.id}`);
        socket.on('sendMessage', (data) => {
            console.log(data);
            io.emit('incoming', data);
        });
        socket.on('present', (data) => {
            users[socket.id] = data;
            console.log(users);
            io.emit('online', users);
        });
        socket.on('close', () => {
            socket.disconnect();
        });
        socket.on('disconnect', () => {
            delete users[socket.id];
            io.emit('online', users);
            console.log('device disconnect');
            console.log(users);
        });
    },
    []
);

app.use((err, req, res, next) => {
    const messageError = err.message || "internal server error"
    const statusCode = err.status || 500
    res.status(statusCode).json({
        message: messageError
    })
    next()
})

// httpServer.listen(port, () => {
//     console.log('Server Running on Port ' + port);
// });
httpServer.listen(port, () => {
    console.log('Server Running on Port ' + port);
});
// app.listen(port, () => {
//     console.log(`http://localhost:${port}`);
// })