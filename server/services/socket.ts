import { Server } from "socket.io";
import { puppeteerService } from "./puppeteer";

class SocketService {
    private _io;

    constructor() {
        this._io = new Server({
            cors: {
                credentials: true,
                origin: '*',
                allowedHeaders: ['*'],
            }
        })
    }

    get io() {
        return this._io as Server
    }

    initSocketListner() {
        this.io.on('connection', (socket) => {
            console.log(`Connection success ${socket.id}`)

            socket.on('search:video', async (value) => {
                console.log(value)
                console.log('search video idhar aaraha hai')
                const videoTitles = await puppeteerService(value);
                socket.emit('response:video-title', videoTitles)
            })
        })
    }
}

export default new SocketService();