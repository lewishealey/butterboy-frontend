const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST_KEY);

exports.handler = function(event, context, callback) {
  console.log(event);
  const data = event.body;
  client.transmissions
    .send({
      content: {
        template_id: "order-confirmed",
        subject: `Order #${data.order_number} Confirmed` //data.subject,
      },
      recipients: [
        {
          address: {
            email: data.email, //data.userEmail
            name: `${data.shipping.fName} ${data.shipping.lName}` //`${data.fName} ${data.lName}`,
          },
        }
      ]
  }).then((data) => {
    return { statusCode: 200, body: JSON.stringify({ data }) };
  })
  .catch((err) => {
    return { statusCode: 500, body: JSON.stringify({ data }) };
  });
}