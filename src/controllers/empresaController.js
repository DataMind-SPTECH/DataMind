var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
  let nome = req.body.nomeServer;
  let cnpj = req.body.cnpjServer;
  let cep = req.body.cepServer;
  let logradouro = req.body.logradouroServer;
  let telefone = req.body.telefoneServer;
  let bairro = req.body.bairroServer;
  let numero = req.body.numeroServer;
  let complemento = req.body.complementoServer;

      empresaModel.cadastrar(nome, cnpj, cep, logradouro, telefone, bairro, numero, complemento).then(
        function (resultado) {
          res.json({
              idEmpresa:resultado.insertId
              
          });
          console.log('ID do último registro inserido:', resultado.insertId);
      }
      );
}

module.exports = {
  cadastrar
};
