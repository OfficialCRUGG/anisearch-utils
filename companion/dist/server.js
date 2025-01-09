import * as http from "http";
import { ConfigManager } from "./config.js";
import { RichPresence } from "./rpc.js";
export function initServer() {
    const server = http.createServer(async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins or specify a specific one
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        if (req.method === "OPTIONS") {
            res.writeHead(204); // No Content
            res.end();
            return;
        }
        if (req.url === "/rpc" && req.method === "POST") {
            const contentType = req.headers["content-type"];
            const token = req.headers["authorization"];
            if (contentType === "application/json" &&
                token === ConfigManager.config.token) {
                let body = "";
                req.on("data", (chunk) => {
                    body += chunk;
                });
                req.on("end", () => {
                    try {
                        const parsedBody = JSON.parse(body);
                        // Process the parsed JSON body
                        RichPresence.updatePresence(parsedBody);
                        // Send a JSON success response
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ message: "Request processed successfully" }));
                    }
                    catch (err) {
                        // Handle JSON parsing error
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid JSON body" }));
                    }
                });
            }
            else {
                // Handle missing or incorrect headers
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    error: "Invalid headers or missing/incorrect authorization token",
                }));
            }
        }
        else {
            // Send JSON 404 response
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Not Found" }));
        }
    });
    server.listen(8381, () => {
        console.log("Server started on port 8381");
    });
}
