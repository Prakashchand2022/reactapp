import * as express from 'express';
import {getEnvironmentVariables} from './environments/env';
import * as mongoose from 'mongoose';
import UserRouter from './routers/UserRouter';
import PostRouter from './routers/PostRouter';
import CommentRouter from './routers/CommentRouter';
import bodyParser = require('body-parser');
import * as path from 'path';
import * as cors from 'cors';

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.reactBuild();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations() {
        this.connectMongoDb();
        this.app.use(cors({
            origin:'https://erprakash.tech',
             
            
           }));
        this.configureBodyParser();
    }

    connectMongoDb() {
        const databaseUrl = getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl).then(() => {
            console.log('connected to database');
        });
    }
s

   

    configureBodyParser() {
       
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());

    }

    setRoutes() {
        
        this.app.use('/src/uploads',express.static('src/uploads'));
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/post', PostRouter);
        this.app.use('/api/comment',CommentRouter);
        
    }


reactBuild(){
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
        })
    }

    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            })
        })
    }
}
