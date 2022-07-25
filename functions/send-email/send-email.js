const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST_KEY);

exports.handler = function(event, context, callback) {
  console.log(event);
  const data = event.body;
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
          },
        },
      ]
  }).then((data) => {
    return { statusCode: 200, body: JSON.stringify({ data }) };
  })
  .catch((err) => {
    return { statusCode: 500, body: JSON.stringify({ data }) };
  });
}

// exports.handler = function(event, context, callback) {
//   console.log(event);
//   const data = event.body;
//   client.transmissions
//     .send({
//       content: {
//         template_id: "order-confirmed",
//         subject: `Order #${data.order_number} Confirmed` //data.subject,
//       },
//       recipients: [
//         {
//           address: {
//             email: data.email, //data.userEmail
//           },
//         },
//       ]
//   }).then((data) => {
//     return { statusCode: 200, body: JSON.stringify({ data }) };
//   })
//   .catch((err) => {
//     return { statusCode: 500, body: JSON.stringify({ data }) };
//   });
// }