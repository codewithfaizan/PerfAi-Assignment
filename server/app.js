import express from "express";
import logger from 'morgan';
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit"
import MongoStore from "connect-mongo";
import dbConnect from "./utils/dbConnect.js";
import publicRouter from "./controllers/public/index.js"

import propertyrouter from "././controllers/property/index.js"
import taskrouter from "./controllers/task/index.js"
dotenv.config();

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
dbConnect();

const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 5 requests per windowMs
    message: "<h1>Too many requests from this IP, please try again later.</h1>",
  });

app.use(cors(corsOptions));
app.use(session({
    secret: 'waqftracker',
    resave: false,
    saveUninitialized: false,
    cookie : {secure : false, maxAge : 1000*60*60*24 },
    store : MongoStore.create({
        mongoUrl : process.env.MONGODB_SRV,
        collectionName : 'sessions'
    })
}));

app.get('/',(req,res)=> {
    res.status(200).send("Server is Running");
});
app.use(limiter);
app.use('/auth', publicRouter);

app.use('/auth/property', propertyrouter);
app.use('/auth/task', taskrouter);

//Error Handling
app.use((req, res) => {
    res.status(404).send("Not Found - Invalid Route");
});

app.use((req, res, next) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
});

// invoke
app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`)
})
