var database = require("../database/config");

function listarFiliais(idEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    select * from filial where fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQuantidadeFeedbacksPorFilial(idFilial) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    SELECT rating, COUNT(*) AS quantidade_feedbacks FROM feedback where fkFilial = ${idFilial} GROUP BY rating  ORDER BY rating ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTopicosPrincipais(idFilial) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    SELECT 
    c.idCategoria AS id_categoria,
    c.descricao AS categoria,
    COUNT(f.idFeedback) AS total_feedbacks
    FROM 
    feedback f
    JOIN 
    categoria c ON f.fkCategoria = c.idCategoria
    WHERE 
    f.fkFilial = ${idFilial}
    GROUP BY 
    c.idCategoria, c.descricao
    ORDER BY 
    total_feedbacks DESC;
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCategorias() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
   select * from categoria;
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarFuncionarios(idEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        select f.idFuncionario, f.nome, f.email, c.cargo from funcionario f join cargo c on fkCargo = idCargo where fkEmpresa = ${idEmpresa} ;
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFeedbackPorCategoriaEFilial(idFilial, idCategoria) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
  SELECT 
    f.idFeedback AS id_feedback,
    f.descricao AS descricao_feedback,
    f.rating as rating,
    fi.idFilial AS id_filial,
    fi.endereco AS filial,
    c.idCategoria AS id_categoria,
    c.descricao AS categoria
FROM 
    feedback f
JOIN 
    filial fi ON f.fkFilial = fi.idFilial
JOIN 
    categoria c ON f.fkCategoria = c.idCategoria
WHERE 
    idFilial = ${idFilial} and idCategoria = ${idCategoria}
ORDER BY 
    fi.idFilial, c.idCategoria;
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRecomendacoesPorFilialECategoria(idFilial, idCategoria) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
SELECT 
    r.idRecomendacao,
    r.descricao AS recomendacao,
    r.dtCriacao,
    c.descricao AS categoria
FROM 
    recomendacoesIA r
JOIN 
    categoria c ON r.fkCategoria = c.idCategoria
JOIN 
    feedback f ON f.fkCategoria = c.idCategoria
JOIN 
    filial fi ON f.fkFilial = fi.idFilial

WHERE 
    fi.idFilial = ${idFilial}
    AND c.idCategoria = ${idCategoria}
GROUP BY 
	idRecomendacao
ORDER BY 
    r.dtCriacao DESC;
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarFuncionario(nome, email, senha, cpf, idEmpresa, idCargo) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    INSERT INTO funcionario (nome, email, senha, cpf, fkEmpresa, fkCargo) VALUES
    ('${nome}', '${email}', '${senha}', '${cpf}', ${idEmpresa}, ${idCargo});
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPalavrasChave(idCategoria) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    select * from palavrasChave where fkCategoria = ${idCategoria};
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarFuncionario(idFuncionario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    DELETE FROM funcionario WHERE idFuncionario =${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    listarFiliais,
    buscarQuantidadeFeedbacksPorFilial,
    listarTopicosPrincipais,
    buscarCategorias,
    buscarFeedbackPorCategoriaEFilial,
    buscarRecomendacoesPorFilialECategoria,
    listarFuncionarios,
    cadastrarFuncionario,
    buscarPalavrasChave,
    deletarFuncionario
}