const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TABLE
});


exports.sendContact = (req, res) => {
    console.log(req.body);

    const { fName, lName, email, number, question } = req.body


    db.query('INSERT INTO demande_contacte SET ? ', {fName: fName, lName: lName, email: email, number: number, question: question }, (error, results) => {
        if(error) {
            console.log(error)
            return res.render('contact', {
                message: 'please fill all area'
            });
        } else {
            return res.render('index', {
                message: 'Question send we contact you asap',
                user: req.user
            });
        }

    })
}// EO of sendContact

exports.displayTicket = async (req, res, next) => {
    
    db.query('SELECT * FROM demande_contacte', (error, result) => {
        req.ticket = result;
        console.log(req.ticket)
        return next();
    });
    
}