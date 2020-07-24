const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_ID,
  process.env.TWILIO_AUTH_TOKEN
);

const VoiceResponse = require("twilio").twiml.VoiceResponse;

class TwilioService {
  static phoneNumber = process.env.TWILIO_PHONE_NUMBER;

  static async createCall(phoneNumber, phoneNumber2) {
    const response = new VoiceResponse();
    const dial = response.dial();
    dial.number(phoneNumber2);

    console.log(response.toString());

    const result = await twilio.calls.create({
      from: this.phoneNumber,
      to: phoneNumber,
      twiml: response.toString(),
    });
  }

  static async createCallStream(phoneNumber, streamUrl) {
    const response = new VoiceResponse();
    const connect = response.connect();
    connect.stream({
      url: streamUrl,
    });

    const result = await twilio.calls.create({
      from: this.phoneNumber,
      to: phoneNumber,
      twiml: response.toString(),
    });
  }
}

module.exports = TwilioService;
