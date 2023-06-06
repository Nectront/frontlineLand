const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware pour traiter les données POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Définition du dossier public pour les fichiers statiques
app.use(express.static('public'));

// Route pour récupérer les histoires
app.get('/stories', (req, res) => {
  fs.readFile('stories.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Une erreur est survenue lors de la récupération des histoires.');
    }
    const stories = data.split('\n').filter(Boolean);
    res.json(stories);
  });
});

// Route pour ajouter une histoire
app.post('/stories', (req, res) => {
  const story = req.body.story;

  if (!story) {
    return res.status(400).send('Le champ histoire est requis.');
  }

  fs.appendFile('stories.txt', story + '\n', 'utf8', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Une erreur est survenue lors de l'ajout de l'histoire.");
    }
    res.send('Histoire ajoutée avec succès.');
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
