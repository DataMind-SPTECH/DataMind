var dashboardModel = require("../models/dashboardModel");

function buscarFiliasPorEmpresa(req, res) {
  var idEmpresa = req.body.idEmpresa;

  if (idEmpresa == undefined) {
    res.status(400).send('ID DA EMPRESA ESTÁ UNDEFINED ')
  }

  dashboardModel.listarFiliais(idEmpresa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as filias: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function FeedbacksPorQuantidades(req, res) {
  var idFilial = req.body.idFilial;

  if (idFilial == undefined) {
    res.status(400).send('ID DA FILIAL ESTÁ UNDEFINED ')
  }

  dashboardModel.buscarQuantidadeFeedbacksPorFilial(idFilial).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar a quantidade de feedbacks: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function listarTopicosPrincipais(req, res) {
  var idFilial = req.params.idFilial;

  console.log(`Buscando Tópicos`);

  dashboardModel.listarTopicosPrincipais(idFilial).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os tópicos", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarCategorias(req, res) {
  console.log(`Buscando Categorias`);

  dashboardModel.buscarCategorias().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os tópicos", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function listarFeedbacksPorCategoriaEFilial(req, res) {
  var idFilial = req.params.idFilial;
  var idCategoria = req.params.idCategoria

  console.log(`Buscando Tópicos`);

  dashboardModel.buscarFeedbackPorCategoriaEFilial(idFilial, idCategoria).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os feedbacks", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarRecomendacoesPorFilialECategoria(req, res) {
  var idFilial = req.params.idFilial;
  var idCategoria = req.params.idCategoria

  console.log(`Buscando Tópicos`);

  dashboardModel.buscarRecomendacoesPorFilialECategoria(idFilial, idCategoria).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as recomendações", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });

}

function listarFuncionariosPorEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  if (idEmpresa == undefined) {
    res.status(400).send("ID EMPRESA UNDEFINIED")
  }

  dashboardModel.listarFuncionarios(idEmpresa).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as recomendações", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });

}

function buscarPalavrasChavePorCategoria (req, res) {
  var idCategoria = req.params.idCategoria;

  if (idCategoria == undefined) {
    res.status(400).send("ID CATEGORIA UNDEFINIED")
  }

  dashboardModel.buscarPalavrasChave(idCategoria).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as palavras chave", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function deletarFuncionario (req, res) {
  var idFuncionario = req.params.idFuncionario;

  if (idFuncionario == undefined) {
    res.status(400).send("ID FUNCIONARIO UNDEFINIED")
  }

  dashboardModel.deletarFuncionario(idFuncionario).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao deletar funcionario", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrarNovoFuncionario(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  var cpf = req.body.cpf;
  var idEmpresa = req.body.idEmpresa;
  var idCargo = req.body.idCargo;

  if (nome == undefined) {
    res.status(400).send("NOME UNDEFINED");
  }
  
  if (email == undefined) {
    res.status(400).send("EMAIL UNDEFINED");
  }

  if (senha == undefined) {
    res.status(400).send("SENHA UNDEFINED");
  }

  if (cpf == undefined) {
    res.status(400).send("CPF UNDEFINED");
  }

  if (idEmpresa == undefined) {
    res.status(400).send("ID EMPRESA UNDEFINED");
  }

  if (idCargo == undefined) {
    res.status(400).send("ID CARGO UNDEFINED");
  }

  dashboardModel.cadastrarFuncionario(nome, email, senha, cpf, idEmpresa, idCargo).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar ao cadastrar funcionario", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });

}

module.exports = {
  buscarFiliasPorEmpresa,
  FeedbacksPorQuantidades,
  listarTopicosPrincipais,
  buscarCategorias,
  listarFeedbacksPorCategoriaEFilial,
  buscarRecomendacoesPorFilialECategoria,
  listarFuncionariosPorEmpresa,
  cadastrarNovoFuncionario,
  buscarPalavrasChavePorCategoria,
  deletarFuncionario
};