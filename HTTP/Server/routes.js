const app = require("./bootstrap");
const TwilioRoutes = require("../Routes/twilioRoutes");

app.use("/twilio", TwilioRoutes);

module.exports = app;
