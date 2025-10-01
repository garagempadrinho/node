const express = require("express");
const router = express.Router();

module.exports = (db) => {
    // Página de clientes (READ)
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

    // Adicionar cliente (INSERT)
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

    // Página de edição do cliente (UPDATE)
    router.get("/editar/:id", (req, res) => {
        const { id } = req.params;
        db.query("SELECT * FROM clientes WHERE id_cliente = ?", [id], (err, cliente) => {
            if (err) throw err;
            db.query("SELECT * FROM garagem", (err, carros) => {
                if (err) throw err;
                res.render("editarCliente", { cliente: cliente[0], carros });
            });
        });
    });

    // Atualizar cliente (UPDATE)
    router.post("/editar/:id", (req, res) => {
        const { id } = req.params;
        const { nome, telefone, id_carro } = req.body;
        db.query(
            "UPDATE clientes SET nome = ?, telefone = ?, id_carro = ? WHERE id_cliente = ?",
            [nome, telefone, id_carro, id],
            (err) => {
                if (err) throw err;
                res.redirect("/clientes");
            }
        );
    });

    // Deletar cliente (DELETE)
    router.get("/deletar/:id", (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM clientes WHERE id_cliente = ?", [id], (err) => {
            if (err) throw err;
            res.redirect("/clientes");
        });
    });


    return router;
};
