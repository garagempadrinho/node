const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Página de clientes
  router.get("/", (req, res) => {
    const sqlClientes = `
      SELECT c.id_cliente, c.nome, c.telefone, g.modelo
      FROM clientes c
      JOIN garagem g ON c.id_carro = g.id_carro
    `;
    db.query(sqlClientes, (err, clientes) => {
      if (err) throw err;

      db.query("SELECT id_carro, modelo FROM garagem", (err, carros) => {
        if (err) throw err;
        res.render("clientes", { clientes, carros });
      });
    });
  });

  // Adicionar cliente
  router.post("/add", (req, res) => {
    const { nome, telefone, id_carro } = req.body;
    db.query(
      "INSERT INTO clientes (nome, telefone, id_carro) VALUES (?, ?, ?)",
      [nome, telefone, id_carro],
      (err) => {
        if (err) throw err;
        res.redirect("/clientes");
      }
    );
  });

  return router;
};
