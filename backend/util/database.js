// Importation du module MySQL2
const mysql = require('mysql2');

// Importation de la configuration depuis un fichier JSON
const config = require('../config/config.json');

// Création d'une pool de connexions MySQL
const pool = mysql.createPool({
    host: config.host,       // Hôte de la base de données (ex: 'localhost')
    user: config.user,       // Nom d'utilisateur de la base de données
    database: config.database,// Nom de la base de données
    password: config.password // Mot de passe de l'utilisateur de la base de données
});

// Exportation de la pool de connexions avec l'utilisation de promesses
module.exports = pool.promise();
