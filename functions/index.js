const { beforeUserCreated } = require("firebase-functions/v2/identity");
const { HttpsError } = require("firebase-functions/v2/https");

const RESERVED_ADMIN_EMAIL = "ran4code@gmail.com";

exports.reserveAdminEmail = beforeUserCreated((event) => {
  const email = event.data.email?.toLowerCase();
  if (email === RESERVED_ADMIN_EMAIL) {
    throw new HttpsError("permission-denied", "This email is reserved for the administrator.");
  }
});
