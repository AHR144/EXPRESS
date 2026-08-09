import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

/**
 * Initialize socket.io on top of the existing http server, and
 * authenticate each connecting client using the same JWT used by the API.
 *
 * @param {object} httpServer
 * @returns {object} io instance
 */
export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: '*',
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth && socket.handshake.auth.token;

        if (!token) {
            return next(new Error('No token provided'));
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return next(new Error('Invalid token'));
            }
            socket.userId = decoded.id;
            next();
        });
    });

    io.on('connection', (socket) => {
        // Put every user in their own private room, e.g. "user_5"
        socket.join(`user_${socket.userId}`);
    });

    return io;
}

/**
 * Emit a real-time event to a single user's private room.
 *
 * @param {number} userId
 * @param {string} event
 * @param {object} payload
 */
export function emitToUser(userId, event, payload) {
    if (io) {
        io.to(`user_${userId}`).emit(event, payload);
    }
}
