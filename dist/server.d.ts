import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfigurations(): void;
    connectMongoDb(): void;
    s: any;
    configureBodyParser(): void;
    setRoutes(): void;
    reactBuild(): void;
    error404Handler(): void;
    handleErrors(): void;
}
