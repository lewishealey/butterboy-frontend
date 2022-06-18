const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

export default function (req, res) {
  const data = req.body;

  client.transmissions
    .send({
      metadata: data,
      content: {
        template_id: "butterboy",
        subject: `Order #${data.order_number} Confirmed` //data.subject,
      },
      recipients: [
        {
          address: {
            email: "hello@lewi.sh", //data.userEmail
            name: "Lewis Healey" //`${data.fName} ${data.lName}`,
          },
        }, // Customer
        // {
        //   address: {
        //     email: data.repEmail ? data.repEpmail : adminEmail,
        //   },
        //   substitution_data: {
        //     subject: data.adminSubject,
        //     from: `Admin @ Mumford & Wood`,
        //   }
        // },
      ],  // Admin
    })
    .then((data) => {
      res.status(200).json(true);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
