import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
    if (!userId) return null;
    if (socket) return socket;
    const backendURL =
        import.meta.env.MODE === "development"
            ? "http://localhost:8080"
            : import.meta.env.VITE_BACKEND_URL;

    socket = io(backendURL, {
        query: { userId },
        withCredentials: true,
    });

    return socket;
};

export const disconnectSocket = () => {
    if (!socket) return;

    socket.disconnect();
    socket = null;
};
