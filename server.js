require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const express = require('express');
const authRouter = require('./routes/authRouter');
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

console.log(PORT, MONGODB_URI);

class Server{
    constructor(port, url){
        this.port = port;
        this.url = url;
    }
    
    
    async startServer(){
    console.log(PORT, MONGODB_URI);
    try {
        try{
            await mongoose.connect(this.url);
            console.log('mongo connecting');
        } catch (e){
            console.log(e);
        }
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use('', authRouter);

        app.listen(this.port, (res, req) => {
            console.log('server connecting');   
        
        })

        app.get("", (req, res) => {
            res.send('start')
        })


    } catch (e) {
        return res.status(500).send({message: 'Сервер не запустился'})
    }
}
}
module.exports = new Server(PORT, MONGODB_URI);