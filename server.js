const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "nozomi.proxy.rlwy.net",
  user: "root",
  password: "HsViDLwyBHntpbGWfZYqtCUvVPlRdVGd",
  database: "railway",
  port: 37026
});

// TESTE
app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

// CADASTRAR PRODUTO
app.post("/produto", (req, res) => {
  const { desc, marca, codigo } = req.body;

  db.query(
    "INSERT INTO produtos (descricao, marca, codigo) VALUES (?, ?, ?)",
    [desc, marca, codigo],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Produto cadastrado");
    }
  );
});

app.delete("/produto/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM produtos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Produto excluído");
  });
});

app.get("/produtos", (req, res) => {
  db.query("SELECT * FROM produtos", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});