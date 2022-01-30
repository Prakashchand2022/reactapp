"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const env_1 = require("./environments/env");
const mongoose = require("mongoose");
const UserRouter_1 = require("./routers/UserRouter");
const PostRouter_1 = require("./routers/PostRouter");
const CommentRouter_1 = require("./routers/CommentRouter");
const path = require("path");
const cors = require("cors");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.reactBuild();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.connectMongoDb();
        this.app.use(cors({
            origin: 'https://erprakash.tech',
        }));
        this.configureBodyParser();
    }
    connectMongoDb() {
        const databaseUrl = (0, env_1.getEnvironmentVariables)().db_url;
        mongoose.connect(databaseUrl).then(() => {
            console.log('connected to database');
        });
    }
    configureBodyParser() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }
    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/post', PostRouter_1.default);
        this.app.use('/api/comment', CommentRouter_1.default);
    }
    reactBuild() {
        this.app.use(express.static(path.join(__dirname, "build")));
        this.app.get("/*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "build", "index.html"));
        });
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
