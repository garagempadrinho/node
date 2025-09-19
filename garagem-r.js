const express = require("express");
const router = express.Router();

module.exports = (db) => {
    // Página de garagem (READ)
    router.get("/", (req, res) => {
        db.query("SELECT * FROM garagem", (err, results) => {
            if (err) throw err;
            res.render("index", { carros: results });
        });
    });

    // Adicionar carro (CREATE)
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

    // Página de edição do carro (UPDATE)
    router.get("/editar/:id", (req, res) => {
        const { id } = req.params;
        db.query("SELECT * FROM garagem WHERE id_carro = ?", [id], (err, results) => {
            if (err) throw err;
            res.render("editarCarro", { carro: results[0] });
        });
    });

    // Atualizar carro (UPDATE)
    router.post("/editar/:id", (req, res) => {
        const { id } = req.params;
        const { modelo, preco } = req.body;
        db.query(
            "UPDATE garagem SET modelo = ?, preco = ? WHERE id_carro = ?",
            [modelo, preco, id],
            (err) => {
                if (err) throw err;
                res.redirect("/");
            }
        );
    });

    // Deletar carro (DELETE)
    router.get("/deletar/:id", (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM garagem WHERE id_carro = ?", [id], (err) => {
            if (err) throw err;
            res.redirect("/");
        });
    });


    return router;
};
