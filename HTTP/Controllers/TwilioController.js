const TwilioService = require("../../Infrastructure/Services/TwilioService");

class TwilioController {
  static async makeCall(req, res) {
    try {
      const { phoneNumber, phoneNumber2 } = req.body;

      await TwilioService.createCall(phoneNumber, phoneNumber2);

      return res.status(200).json({
        status: "success",
        message: `making call to ${phoneNumber}`,
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  static async makeCallStream(req, res) {
    try {
      const { phoneNumber, streamUrl } = req.body;

      await TwilioService.createCallStream(phoneNumber, streamUrl);

      return res.status(200).json({
        status: "success",
        message: `making call to ${phoneNumber}`,
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  static async createToken(req, res) {
    try {
      const token = await TwilioService.createToken();

      return res.status(200).json({
        status: "success",
        data: {
          token,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  static async handleTwimlWebhook(req, res) {
    try {
      const xml = await TwilioService.handleTwimlWebhook(req.body.number);

      res.type("text/xml");
      res.send(xml);
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

module.exports = TwilioController;
