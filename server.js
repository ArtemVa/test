require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const express = require('express');
const authRouter = require('./routes/authRouter');
const app = express();
const PORT = process.env.PORT;
const url = process.env.url;

class Server{
    constructor(port, url){
        this.port = port;
        this.url = url;
    }
    
    async startServer(){
    try {
        try{
            await mongoose.connect(this.url);
            console.log('mongo connecting');
        } catch (e){
            console.log(e);
        }
        app.use(express.json());
        app.use(cookieParser());
        // app.use('/auth', authRouter);

        app.listen(this.port, (res, req) => {
            console.log('server connecting');   
        
        })

        app.get("", (req, res) => {
            res.send('start')
        })

        app.use('', authRouter);


    } catch (e) {
        return res.status(500).send({message: 'Сервер не запустился'})
    }
}
}
module.exports = new Server(PORT, url);