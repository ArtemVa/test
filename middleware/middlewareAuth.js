const User = require('../model/User')


const middlewareAuth = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        if (!username)
            return res.status(400).json({ message: `Пустое значение поля "Логин"` });
        if (!password)
            return res.status(400).json({ error: `Пустое значение поля "Пароль"`});
        
    } catch(e){
        res.status(400).json({message: `${e.message}`});
    }


    
    req.user = {
        username, 
        password
    };

    next();
}

module.exports = middlewareAuth;