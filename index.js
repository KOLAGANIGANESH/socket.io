// Import packages
import express from 'express';
import http from 'http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server as SocketServer } from 'socket.io';

// Instances
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server); // Use the renamed import

// Serving the HTML file (connect index.html)
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve index.html at root route
app.get("/", (req, res) => res.sendFile(join(__dirname, "index.html")));

// Define a connection event handler
io.on("connection", (client) => {
    console.log("User connected to the server");
    console.log(client.id); // Log the socket ID when a user connects

    // Emit  a 'message' event to the client
    client.emit("message", "server is sending that data to the client");
    
    // Disconnect event
    client.on("disconnect", () => {
        console.log("User Disconnected From (Server)");
        // console.log(message);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
