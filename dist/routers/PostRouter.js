"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const globalMiddleware_1 = require("../middlewares/globalMiddleware");
const PostValidators_1 = require("../validators/PostValidators");
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/me', globalMiddleware_1.GlobalMiddleware.authenticate, PostController_1.PostController.getPostByUser);
        this.router.get('/all', globalMiddleware_1.GlobalMiddleware.authenticate, PostController_1.PostController.getAllPost);
        this.router.get('/:id', globalMiddleware_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.getPostById(), globalMiddleware_1.GlobalMiddleware.CheckError, PostController_1.PostController.getPostById);
    }
    postRoutes() {
        this.router.post('/add', globalMiddleware_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.addPost(), globalMiddleware_1.GlobalMiddleware.CheckError, PostController_1.PostController.addPost);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', globalMiddleware_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.editPost(), globalMiddleware_1.GlobalMiddleware.CheckError, PostController_1.PostController.editPost);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', globalMiddleware_1.GlobalMiddleware.authenticate, PostValidators_1.PostValidators.deletePost(), globalMiddleware_1.GlobalMiddleware.CheckError, PostController_1.PostController.deletePost);
    }
}
exports.default = new PostRouter().router;
