const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('./userLogin');
const {generateRefreshToken} = require('./userLogin');
require('dotenv').config();
const secretRefresh = process.env.REFRESH_TOKEN;

async function refresh(req,res){
        try{
            const refreshToken = req.cookies['refreshToken'];
            if (!refreshToken) {
                return res.status(401).send('Токен не предоставлен!');
              }
            const decoded = jwt.verify(refreshToken, secretRefresh);
            const newRefreshToken = generateRefreshToken(decoded.payload);
            const accessToken = generateAccessToken(decoded.payload);
            res.header('Authorization', accessToken)

            return res.json({newRefreshToken, accessToken});
        } catch(e){
            return res.status(406).send({message: 'Вы не авторизованы!'})
        }
}
module.exports = refresh;