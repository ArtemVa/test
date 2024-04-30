const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('./userLogin');
const {generateRefreshToken} = require('./userLogin');
require('dotenv').config();
const secretRefresh = process.env.refresh_secret;

async function refresh(req,res){
        try{
            const refreshToken = req.cookies['refreshToken'];
            if (!refreshToken) {
                return res.status(401).send('Access Denied. No refresh token provided.');
              }
            const decoded = jwt.verify(refreshToken, secretRefresh);
            const newRefreshToken = generateRefreshToken(decoded.payload);
            const accessToken = generateAccessToken(decoded.payload);
            res.header('Authorization', accessToken)

            return res.json({newRefreshToken, accessToken});
        } catch(e){
            console.log(e);
            return res.send(e)
        }
}
module.exports = refresh;