var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/filiais", function (req, res) {
    dashboardController.buscarFiliasPorEmpresa(req, res);
});

router.post("/qtdfeedbacks", function (req, res) {
    dashboardController.FeedbacksPorQuantidades(req, res);
});

router.get("/topicos/:idFilial", function (req, res) {
    dashboardController.listarTopicosPrincipais(req, res);
});

router.get("/categorias", function (req, res) {
    dashboardController.buscarCategorias(req, res);
});

router.get("/feedbacks/:idFilial/:idCategoria", function (req, res) {
    dashboardController.listarFeedbacksPorCategoriaEFilial(req, res);
});

router.get("/recomendacoes/:idFilial/:idCategoria", function (req, res) {
    dashboardController.buscarRecomendacoesPorFilialECategoria(req, res);
});

router.get("/funcionarios/:idEmpresa", function (req, res) {
    dashboardController.listarFuncionariosPorEmpresa(req, res);
});


router.post("/adicionarfuncionario", function(req,res) {
    dashboardController.cadastrarNovoFuncionario(req,res);
})




module.exports = router;