const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_ID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioI = require("twilio");

const VoiceResponse = twilioI.twiml.VoiceResponse;
const ClientCapability = twilioI.jwt.ClientCapability;

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
    response.say("i will stream next 60 seconds to websocket");
    response.start().stream({
      url: streamUrl,
    });
    response.pause({ length: 60 });

    const result = await twilio.calls.create({
      from: this.phoneNumber,
      to: phoneNumber,
      twiml: response.toString(),
    });
  }

  static async createToken() {
    const capability = new ClientCapability({
      accountSid: process.env.TWILIO_ACCOUNT_ID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    });

    capability.addScope(
      new ClientCapability.OutgoingClientScope({
        applicationSid: process.env.TWILIO_TWIML_APP_SID,
      })
    );

    return capability.toJwt();
  }

  static async handleTwimlWebhook(phoneNumber) {
    const voiceResponse = new VoiceResponse();
    voiceResponse.dial(
      {
        callerId: this.phoneNumber,
      },
      phoneNumber
    );

    return voiceResponse.toString();
  }
}

module.exports = TwilioService;
