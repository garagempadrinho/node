const mysql = require('mysql2');

// Cria a conexão
const connection = mysql.createConnection({
  host: 'localhost',     // ou o IP do servidor MySQL
  user: 'root',
  password: '',
  database: 'Garagem'
});

// Conectar
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

module.exports = connection;