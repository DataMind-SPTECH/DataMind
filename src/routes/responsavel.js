var express = require("express");
var router = express.Router();

var responsavelController = require("../controllers/responsavelController");


router.post("/cadastrar", function (req, res) {
    responsavelController.cadastrar(req, res);
})

module.exports = router;