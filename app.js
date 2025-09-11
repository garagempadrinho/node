const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Garagem"
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

// Rotas separadas
app.use("/", require("./routes/garagem")(db));       // carros
app.use("/clientes", require("./routes/clientes")(db));
app.use("/vendas", require("./routes/vendas")(db));

// Servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
