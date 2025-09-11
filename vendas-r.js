const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Página de vendas
  router.get("/", (req, res) => {
    const sqlVendas = `
      SELECT v.id_venda, v.valor_venda, v.desconto, c.nome
      FROM vendas v
      JOIN clientes c ON v.id_cliente = c.id_cliente
    `;
    db.query(sqlVendas, (err, vendas) => {
      if (err) throw err;

      db.query("SELECT id_cliente, nome FROM clientes", (err, clientes) => {
        if (err) throw err;
        res.render("vendas", { vendas, clientes });
      });
    });
  });

  // Adicionar venda
  router.post("/add", (req, res) => {
    const { valor_venda, desconto, id_cliente } = req.body;
    db.query(
      "INSERT INTO vendas (valor_venda, desconto, id_cliente) VALUES (?, ?, ?)",
      [valor_venda, desconto, id_cliente],
      (err) => {
        if (err) throw err;
        res.redirect("/vendas");
      }
    );
  });

  return router;
};
