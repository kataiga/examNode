// import des modules et creation de l'app express
const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

// définition des fichier config
dotenv.config({ path: './config/.env'});
const db = require('./config/db');
const publicDirectory = path.join(__dirname, './public');
hbs.registerPartials(path.join(__dirname, './views/partials'));

// import des middleware
const mid = require('./middleware/auth');

// ici je dit a l'app d'utiliser le contenu du dossier public et je définie la view engine
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

// Ici ca permet de convertir le contenu reçus pour que l'app puisse bien les traiter
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// connexion a la BDD
db.start.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("mysql Connected...")
    }
});

// je demande a l'ap d'utiliser ce middleware ici car je veux qu'il soit constament utiliser donc je le définie avant les routes
app.use(mid.isLog);

// définition des routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT;
// creation du serveurt sur le port défini par la const PORT
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
})