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
}

module.exports = TwilioController;
