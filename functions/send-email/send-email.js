const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST_KEY);

exports.handler = function(event, context, callback) {
  console.log(event);
  client.transmissions
    .send({
      content: {
        template_id: "order-confirmed",
        subject: `Order #0000 Confirmed` //data.subject,
      },
      recipients: [
        {
          address: {
            email: "hello@lewi.sh", //data.userEmail
            name: `Lewis Healey` //`${data.fName} ${data.lName}`,
          },
        }
      ]
  });
}