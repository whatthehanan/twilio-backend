const { Router: getRouter } = require("express");
const router = getRouter();
const TwilioController = require("../Controllers/TwilioController");

router.post("/", TwilioController.makeCall);

module.exports = router;
