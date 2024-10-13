var database = require("../database/config");

function cadastrar(nome, email, telefone, cpf, senha, idEmpresa) {
  var instrucaoSql = `INSERT INTO funcionario (nome, email, senha, telefone, cpf, fkEmpresa, fkCargo) values 
("${nome}", '${email}', '${senha}', '${telefone}', '${cpf}','${idEmpresa}', 1)`;

  return database.executar(instrucaoSql);
}

module.exports = { cadastrar };
