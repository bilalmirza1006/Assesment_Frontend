import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Set base URL
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000, // Optional timeout of 5 seconds
});

export default api;
