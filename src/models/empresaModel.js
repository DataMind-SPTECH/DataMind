var database = require("../database/config");

function cadastrar(nome, cnpj, cep, logradouro, telefone, bairro, numero, complemento) {
  var instrucaoSql = `INSERT INTO empresa (nomeEmpresa, cnpj) values 
("${nome}", '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { cadastrar };
