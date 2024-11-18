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


module.exports = router;