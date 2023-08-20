// NOTE: this function is a placeholder, you don't need to fix/implement it
const sendEmail = (email, body) => {
  console.log('Sending email to ' + email + ' with body ' + body);
};

exports.sendEmail = sendEmail;

exports.sendRecoveryEmail = (email, password) => {
  sendEmail(email, "Your password is " + password);
};
