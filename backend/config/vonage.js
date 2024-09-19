// const { Vonage } = require("@vonage/server-sdk");

// const vonage = new Vonage({
//   apiKey: process.env.VONAGE_API_KEY,
//   apiSecret: process.env.VONAGE_API_SECRET,
// });

// const from = process.env.VONAGE_BRAND_NAME;
// const text = process.env.VONAGE_TEXT;

// async function sendSMS(phoneNumber) {
//   vonage.sms
//     .send({ to: phoneNumber, from, text })
//     .then((res) => {
//       console.log("====================================");
//       console.log("Message sent success: ", res);
//       console.log("====================================");
//     })
//     .catch((err) => {
//       console.log("====================================");
//       console.log("Message sent fail: ", err);
//       console.log("====================================");
//     });
// }

// async function verifyPhone(phoneNumber) {
//   vonage.verify
//     .start({
//       number: phoneNumber,
//       brand: from,
//     })
//     .then((resp) => {
//       console.log("====================================");
//       console.log("Send OTP", resp.request_id);
//       console.log("====================================");
//     })
//     .catch((err) => console.error("OTP fail: ", err));
// }

// async function checkOTP(requestId, code) {
//   vonage.verify
//     .check(requestId, code)
//     .then((resp) => console.log("check verify success: ", resp))
//     .catch((err) => console.error("check verify fail: ", err));
// }

// async function cancelVerify(requestId) {
//   vonage.verify
//     .cancel(requestId)
//     .then((resp) => console.log("Cancel verify success: ", resp))
//     .catch((err) => console.error("Cancel verify fail: ", err));
// }

// module.exports = { sendSMS, verifyPhone, checkOTP, cancelVerify };
