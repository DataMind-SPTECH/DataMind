var dashboardModel = require("../models/dashboardModel");

 function buscarFiliasPorEmpresa(req, res) {
    var idEmpresa = req.body.idEmpresa;
    
    if(idEmpresa == undefined) {
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
    
    // if(idFilial == undefined) {
    //     res.status(400).send('ID DA FILIAL ESTÁ UNDEFINED ')
    // }

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
  

module.exports =  {
    buscarFiliasPorEmpresa,
    FeedbacksPorQuantidades
}