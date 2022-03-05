const mongoose = require("mongoose");

const TransacoesSchema = new mongoose.Schema({
  valor: {
    type: Number,
    get: (v) => (v / 100).toFixed(2),
    set: (v) => v * 100,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  identificacao: {
    type: String,
  },
  descricao: {
    type: String,
  },
  data: {
    type: String,
  },
  dataInclusao: {
    type: String,
  },
  _userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Transacoes = mongoose.model("Transacoes", TransacoesSchema);

module.exports = { Transacoes };
