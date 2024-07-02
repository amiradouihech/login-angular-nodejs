// Importation des modules nécessaires
const express = require("express");
const bodyParser = require('body-parser');


const authRoutes=require('./routes/auth');

const postsRoutes=require('./routes/posts');

const { authPlugins } = require("mysql2");

// Initialisation de l'application Express
const app = express();

const errorController=require('./controllers/error');
// Définition du port d'écoute, avec une valeur par défaut de 3000 si la variable d'environnement PORT n'est pas définie
const ports = process.env.PORT || 3000;

// Middleware pour analyser les corps de requêtes au format JSON
app.use(bodyParser.json());

// Middleware pour définir les en-têtes HTTP nécessaires pour gérer les requêtes CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    // Permettre l'accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Permettre les méthodes HTTP spécifiques
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    // Permettre certains en-têtes dans les requêtes
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    // Passer au middleware suivant dans la pile
    next();
});

app.use('/auth',authRoutes);

app.use('/posts',postsRoutes);

app.use(errorController.get404);

app.use(errorController.get500);
// Démarrage du serveur et écoute sur le port spécifié
app.listen(ports, () => console.log(`Listening on port ${ports}`));
