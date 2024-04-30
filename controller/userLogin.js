const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User')
require('dotenv').config();
const secret = process.env.secret;
const secretRefresh = process.env.refresh_secret;

const generateAccessToken = id => {
    const payload = {id};

    return jwt.sign(payload, secret, {expiresIn: '2m'}, { algorithm: 'HS512' });
}

const generateRefreshToken = id => {
    const payload = {id};

    return jwt.sign(payload, secretRefresh, {expiresIn: '10s'}, { algorithm: 'HS512' });
}

async function login(req, res){
        try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!username){
            return res.status(400).json({message: `${username} не найден`})
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({message: 'Введен неверный пароль'})
        }
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        res.header('Authorization', accessToken);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict'
        })
         return res.json({accessToken, refreshToken});
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

module.exports = {login, generateAccessToken, generateRefreshToken};