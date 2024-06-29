import React, { createContext, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL;
const socket: Socket = io(socketServerUrl);
export const SocketContext = createContext(socket);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};