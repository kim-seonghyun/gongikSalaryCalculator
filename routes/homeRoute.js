const homeController = require("../controller/homeController"),
router = require("express").Router();

router.get("/",homeController.index);

module.exports = router;