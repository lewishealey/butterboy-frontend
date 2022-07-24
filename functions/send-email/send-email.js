const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST_KEY);

const sendEmail = async (data) => {
  console.log('Sending the email');
  client.transmissions
    .send({
      metadata: data,
      content: {
        template_id: "order-confirmed",
        subject: `Order #${data.order_number} Confirmed` //data.subject,
      },
      recipients: [
        {
          address: {
            email: "hello@lewi.sh", //data.userEmail
            name: `${data.shipping.fName} ${data.shipping.lName}` //`${data.fName} ${data.lName}`,
          },
        }
      ]
  });
};

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    await sendEmail(data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Let's become serverless conductors!!!",
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed sending email' }),
    };
  }
};