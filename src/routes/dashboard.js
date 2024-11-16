var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/filiais", function (req, res) {
    dashboardController.buscarFiliasPorEmpresa(req, res);
});

router.post("/qtdfeedbacks", function (req, res) {
    dashboardController.FeedbacksPorQuantidades(req, res);
});


module.exports = router;