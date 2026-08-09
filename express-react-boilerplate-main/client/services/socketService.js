import { io } from 'socket.io-client';

import { HOST, JWT_TOKEN } from '../config/config';
import { getLocalStorage } from '../utils/storageUtil';

let socket = null;

/**
 * Connect to the real-time server, authenticated with the current JWT.
 * Safe to call multiple times - reuses the existing connection.
 */
export const connectSocket = () => {
  if (socket && socket.connected) {
    return socket;
  }

  const token = getLocalStorage(JWT_TOKEN);

  socket = io(`http://${HOST.replace(/\/$/, '')}`, {
    auth: { token },
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
