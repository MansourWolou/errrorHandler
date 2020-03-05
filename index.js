const express = require("express");
const app = express();
const port = 3000;

/* on suppose quil ya unne erreur dans le code qui doit s"exécuté quand on va sur la route "/" */
app.get("/", (req, res, next) => {
    throw new Error("Something went wrong!"); // cette ligne crée une erreur da,s le code
    res.send("Welcome to main route!");
  });

app.get("/about", (req, res, next) => {
 res.send("This is the about route!");
});
/*
 ce middlware est traité si aucune des routes dévinies par le dev n'est
 matché par la requète de l'utilisateur
*/
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  // error handler middleware
  app.use((error, req, res, next) => {
      res.status(error.status || 500).send({
        error: {
          status: error.status || 500, // soit le type d'erreur est défini , soit on met type : 500
          message: error.message || 'Internal Server Error', // soite la page n'est pas trouvé , soit il sagit d'une erreur du server
        },
      });
    });
  

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));