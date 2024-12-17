"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routers/user.router");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_router_1.userRouter);
app.use("*", (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
