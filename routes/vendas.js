const express = require("express");
const router = express.Router();

module.exports = (db) => {
    // Página de vendas (READ)
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

    // Adicionar venda (INSERT)
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

    // Página de edição da venda (UPDATE)
    router.get("/editar/:id", (req, res) => {
        const { id } = req.params;
        db.query("SELECT * FROM vendas WHERE id_venda = ?", [id], (err, venda) => {
            if (err) throw err;
            db.query("SELECT * FROM clientes", (err, clientes) => {
                if (err) throw err;
                res.render("editarVenda", { venda: venda[0], clientes });
            });
        });
    });

    // Atualizar venda (UPDATE)
    router.post("/editar/:id", (req, res) => {
        const { id } = req.params;
        const { valor_venda, desconto, id_cliente } = req.body;
        db.query(
            "UPDATE vendas SET valor_venda = ?, desconto = ?, id_cliente = ? WHERE id_venda = ?",
            [valor_venda, desconto, id_cliente, id],
            (err) => {
                if (err) throw err;
                res.redirect("/vendas");
            }
        );
    });

    // Deletar venda (DELETE)
    router.get("/deletar/:id", (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM vendas WHERE id_venda = ?", [id], (err) => {
            if (err) throw err;
            res.redirect("/vendas");
        });
    });

    return router;
};
