const jwt = require('jsonwebtoken');
// const mysqlConnection = require('../config/mysql');

const autorizaUsuario = async (req, res, next) => {
    const strToken = req.headers.authorization

    if(!strToken){
        return res.status().json({ message: 'No se encontro el token'})
    }

    try {
        const token = strToken.split(" ")[1];
        jwt.verify(token, process.env.TOKEN)
        
    } catch (error) {
        return res.json({ error })
    }    
    next();
}

module.exports = autorizaUsuario