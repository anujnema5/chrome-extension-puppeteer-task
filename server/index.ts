import http from 'http'
import socket from './services/socket'

const server = http.createServer((req, res) => {});
const PORT = 8500

socket.io.attach(server)
socket.initSocketListner();

server.listen(PORT, () => {
    console.log(`SERVER STARTED http://localhost:${PORT}/`)
})