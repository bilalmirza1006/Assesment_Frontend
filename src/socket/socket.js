// // socket.js
// import { io } from 'socket.io-client';

// let socket = null;

// // Connect to the socket server
// export const connectSocket = (token) => {
//     if (!socket) {
//         socket = io('http://localhost:5000', {
//             auth: { token }, // Optional: pass token for authentication
//             transports: ['websocket'], // Use WebSocket for real-time communication
//             // transports: ["websocket"],
//         });

//         socket.on('connect', () => {
//             console.log('Socket connected:', socket.id);
//         });

//         socket.on('disconnect', () => {
//             console.log('Socket disconnected');
//         });
//     }
//     return socket;
// };

// // Get the existing socket instance
// export const getSocket = () => {
//     if (!socket) {
//         console.error('Socket is not connected! Please log in.');
//     }
//     return socket;
// };

// // Disconnect the socket
// export const disconnectSocket = () => {
//     if (socket) {
//         socket.disconnect();
//         socket = null;
//         console.log('Socket has been disconnected');
//     }
// };
import { io } from "socket.io-client";

let socket = null;

/**
 * Connect to the socket server with an optional authentication token.
 * @param {string} token - The authentication token to pass during connection.
 * @returns {object} - The connected socket instance.
 */
export const connectSocket = (token) => {
    if (!socket) {
        socket = io("http://localhost:5000", {
            auth: { token },
            transports: ["websocket"],
            reconnection: true,          // Enable reconnection
            reconnectionAttempts: 5,     // Number of attempts
            reconnectionDelay: 1000,     // Delay between attempts
            reconnectionDelayMax: 5000,  // Max delay
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", (reason) => {
            console.log(`Socket disconnected: ${reason}`);
        });

        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error.message);
        });
    }
    return socket;
};

/**
 * Get the existing socket instance.
 * @returns {object|null} - The socket instance or null if not connected.
 */
export const getSocket = () => {
    if (!socket) {
        console.error("Socket is not connected! Please call connectSocket() first.");
    }
    return socket;
};

/**
 * Disconnect the socket and clear the instance.
 */
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect(); // Gracefully disconnect from the server
        socket = null; // Reset the socket instance
        console.log("Socket has been disconnected");
    } else {
        console.warn("Socket is already disconnected or not initialized.");
    }
};
