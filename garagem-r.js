const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Página de garagem
  router.get("/", (req, res) => {
    db.query("SELECT * FROM garagem", (err, results) => {
      if (err) throw err;
      res.render("index", { carros: results });
    });
  });

  // Adicionar carro
  router.post("/add", (req, res) => {
    const { modelo, preco } = req.body;
    db.query(
      "INSERT INTO garagem (modelo, preco) VALUES (?, ?)",
      [modelo, preco],
      (err) => {
        if (err) throw err;
        res.redirect("/");
      }
    );
  });

  return router;
};
