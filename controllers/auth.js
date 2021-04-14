const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TABLE
});

exports.register = (req, res) => {
    console.log(req.body);

/**
    const pseudo = req.body.pseudo;
    const email = req.body.email;
    const password = req.body.password;
    const passwordCheck = req.body.passwordCheck;
*/
    // cette ligne reviens a faire tout le code en commentaire au dessus
    const { pseudo, email, password, passwordCheck} = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
                if(error) {
                    console.log(error);
                }

                if( results.length > 0 ) {
                    return res.render('register', {
                        message: 'That email is already in use..'
                    })
                } else if( password !== passwordCheck ) {
                    return res.render('register', {
                        message: 'The password do not match..'
                    });
                }

                    db.query('SELECT pseudo FROM users WHERE pseudo = ?', [pseudo], async (error, results) => {
                        if(error) {
                            console.log(error);
                        }
                
                        if( results.length > 0 ) {
                            return res.render('register', {
                                message: 'The pseudo is already in use..'
                            });
                        }
                    });// EO db.query check pseudo

                    let transport = nodemailer.createTransport({
                        host: 'smtp.mailtrap.io',
                        port: 2525,
                        auth: {
                            user: process.env.SMTP_USER,
                            pass: process.env.SMTP_PSWD 
                        },
                    });
                    // prepare the mail
                    let message = ({
                        from: 'admin@test.fr', // sender address
                        to: req.body.email,
                        subject: "✔ Bonjour " + req.body.pseudo + " votre compte est créé !", // Subject line
                        text: "Bonjour " + req.body.pseudo + "\nMessage de votre administrateur <3 "  
                    });
                    // sending the mail
                    transport.sendMail(message, function(err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(info);
                        }
                    });

                    let hashedPassword = await bcrypt.hash(password, 8);

                    db.query('INSERT INTO users SET ? ', {pseudo: pseudo, email: email, password: hashedPassword }, (error, results) => {
                        if(error) {
                            console.log(error)
                        } else {
                            return res.render('login', {
                                message: 'user registered now you can log in !'
                            });
                        }

                    })//EO db.query insert new user
            });//EO db.query check mail

}// EO register function

exports.login = async (req, res) => {
    try {

        const {pseudo, password } = req.body;

        if( !pseudo || !password ){
            return res.status(400).render('login', {
                message: 'Please provide your pseudo and password !'
            })
        }

        db.query('SELECT * FROM users WHERE pseudo = ?', [pseudo], async (error, results) => {
            
            if( !results  || !(await bcrypt.compare(password, results[0].password) ) ) {
                res.status(401).render('login', {
                    message: 'Your informations is incorrect.. '
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions );
                res.status(200).redirect("/")
            }
        });

    } catch (error) {
        console.log(error);
    }
};

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).redirect("/");
  };