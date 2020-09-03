const { Router: getRouter } = require("express");
const router = getRouter();
const TwilioController = require("../Controllers/TwilioController");

router.post("/", TwilioController.makeCall);
router.post("/stream", TwilioController.makeCallStream);
router.get("/token", TwilioController.createToken);
router.post("/voice", TwilioController.handleTwimlWebhook);

module.exports = router;
