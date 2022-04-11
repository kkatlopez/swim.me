import React from 'react';
import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

const ENDPOINT = "http://localhost:3001";
export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();
