import * as express from 'express';
import { Server, createServer } from 'http';
import io from 'socket.io/lib/index';
// import io from 'socket.io-client/dist/socket.io';

export class SocketIO {
    public readonly PORT: number = 3000;
    private io: SocketIO.Server;
    private server: Server;

    constructor(app: express.Application) {
        this.createServer(app);
        this.sockets();
        // this.listen();
    }

    private createServer(app): void {
        this.server = createServer(app);
    }

    private sockets(): void {
        // console.log(socketIo);
        console.log('Server', this.server);
        // this.io = socketIo(this.server);
        this.io = io(this.server);
        // this.io = require('socket.io')(this.server);
    }

    private listen(): void {
        this.server.listen(this.PORT, () => {
            console.log('Running server on port %s', this.PORT);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.PORT);

            socket.on('message', m => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}

export function initSocket(app: express.Application): SocketIO {
    return new SocketIO(app);
}
