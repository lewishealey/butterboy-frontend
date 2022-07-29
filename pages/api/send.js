const SparkPost = require("sparkpost");
var client = require("klaviyo-sdk");

const sendThankYouEmail = async (data) => {
  const client = new SparkPost(process.env.SPARKPOST_KEY);
  await client.transmissions.send({
    metadata: data,
    content: {
      template_id: "order-confirmed",
      subject: `Order #${data.order_number} Confirmed`, //data.subject,
    },
    recipients: [
      {
        address: {
          email: data.email,
          name: `${data.shipping.fName} ${data.shipping.lName}`,
        },
      },
      {
        address: {
          email: process.env.ADMIN_EMAIL,
          name: `${data.shipping.fName} ${data.shipping.lName}`,
        },
      },
    ],
  });
};

const saveUser = async ({ billing, email, phone }) => {
  console.log("sending email", billing, email, phone)
  const url =
    "https://a.klaviyo.com/api/v2/list/Vs4P8F/members?api_key=" +
    process.env.KLAYVIO_API_KEY;
  const options = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      profiles: [
        {
          first_name: billing?.firstName,
          last_name: billing?.lastName,
          email: email
        },
      ],
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => { return json })
    .catch((err) => console.error("error:" + err));
};

export default async function (req, res) {
  try {
    const data = req.body;
    console.log("Send email");

    await sendThankYouEmail(data);
    await saveUser(data);

    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
