const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST_KEY);

export default function (req, res) {
  const data = req.body;

  // client.transmissions
  //   .send({
  //     metadata: data,
  //     content: {
  //       template_id: "order-confirmed",
  //       subject: `Order #${data.order_number} Confirmed` //data.subject,
  //     },
  //     recipients: [
  //       {
  //         address: {
  //           email: data.email, //data.userEmail
  //           name: `${data.shipping.fName} ${data.shipping.lName}` //`${data.fName} ${data.lName}`,
  //         },
  //       }
  //     ]
  //   })
  //   .then((data) => {
  //     res.status(200).json(true);
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err);
  //   });
}
