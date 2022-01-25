"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = require("../controllers/CommentController");
const globalMiddleware_1 = require("../middlewares/globalMiddleware");
const CommentValidators_1 = require("../validators/CommentValidators");
class CommentRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
    }
    postRoutes() {
        this.router.post('/add/:id', globalMiddleware_1.GlobalMiddleware.authenticate, CommentValidators_1.CommentValidators.addComment(), globalMiddleware_1.GlobalMiddleware.CheckError, CommentController_1.CommentController.addComment);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', globalMiddleware_1.GlobalMiddleware.authenticate, CommentValidators_1.CommentValidators.editComment(), globalMiddleware_1.GlobalMiddleware.CheckError, CommentController_1.CommentController.editComment);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', globalMiddleware_1.GlobalMiddleware.authenticate, CommentValidators_1.CommentValidators.deleteComment(), globalMiddleware_1.GlobalMiddleware.CheckError, CommentController_1.CommentController.deleteComment);
    }
}
exports.default = new CommentRouter().router;
