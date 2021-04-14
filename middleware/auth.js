const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TABLE,
});

// permet de vérifier si l'utilisateur est connecter et faire transité les infos sur toutes les pages
exports.isLog = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        console.log("decoded"); 
        console.log(decoded);
        // 2) Check if user still exists
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
          
          console.log(result)
          if(!result) {
            return next();
          }
          // THERE IS A LOGGED IN USER
          req.user = result[0];
          // res.locals.user = result[0];
          console.log("next")
          return next();
        }); 
      } catch (err) {
        return next();
      }
    } else {
      next();
    }
  };