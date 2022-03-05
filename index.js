const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");

const { Transacoes } = require("./db/models");

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.get("/transacoes", (req, res) => {
  Transacoes.find({}).then((transacoes) => {
    res.send(transacoes);
  });
});

app.post("/transacoes", (req, res) => {
  let valor = req.body.valor;
  let tipo = req.body.tipo;
  let descricao = req.body.descricao;
  let dataInclusao = req.body.dataInclusao;

  let newTransacao = new Transacoes({
    valor,
    tipo,
    descricao,
    dataInclusao,
  });

  newTransacao.save().then((transacaoDoc) => {
    res.send(transacaoDoc);
  });
});

app.get("/transacoes/:id", (req, res) => {
  Transacoes.findOne({ _id: req.params.id }).then((transacoes) => {
    res.send(transacoes);
  });
});

app.patch("/transacoes/:id", (req, res) => {
  Transacoes.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/transacoes/:id", (req, res) => {
  Transacoes.findByIdAndDelete({ _id: req.params.id }).then(
    (removedTransacoesDoc) => {
      res.send(removedTransacoesDoc);
    }
  );
});

app.listen(3000);
