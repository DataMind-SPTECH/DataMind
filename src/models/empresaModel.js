var database = require("../database/config");

function cadastrar(nome, cnpj, cep, logradouro, telefone, bairro, numero, complemento) {
  var instrucaoSql = `INSERT INTO empresa (nomeEmpresa, cnpj, cep, rua, bairro, complemento, numero) values 
("${nome}", '${cnpj}', '${cep}', '${logradouro}', '${bairro}','${complemento}', '${numero}')`;

  return database.executar(instrucaoSql);
}

module.exports = { cadastrar };
