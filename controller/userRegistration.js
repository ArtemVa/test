const User = require('../model/User')
const bcrypt = require('bcryptjs');


async function registration(req, res){
        try{
            const {username, password} = req.body;
            const checkUser = await User.findOne({username});
            if(checkUser){
                return res.status(400).json({message: 'Пользователь уже зарегистрирован'});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password:hashPassword});
            await user.save();
            return res.json({message: "Пользователь успешно зарегистрирован"});
        }
        catch(e){
            res.status(400).json({message: 'Registration error'});
        }
    }

module.exports = registration;