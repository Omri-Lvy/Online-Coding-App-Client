import React, { createContext, ReactNode } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
export const SocketContext = createContext(socket);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};