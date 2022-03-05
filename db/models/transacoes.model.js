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
  descricao: {
    type: String,
  },
  dataInclusao: {
    type: String,
    required: true,
  },
  _userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Transacoes = mongoose.model("Transacoes", TransacoesSchema);

module.exports = { Transacoes };
