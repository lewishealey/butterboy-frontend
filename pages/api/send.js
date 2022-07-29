const SparkPost = require('sparkpost');
var client = require('klaviyo-sdk');

const sendThankYouEmail = async (data) => {
  const client = new SparkPost(process.env.SPARKPOST_KEY);
    await client.transmissions
    .send({
      metadata: data,
      content: {
        template_id: "order-confirmed",
        subject: `Order #${data.order_number} Confirmed` //data.subject,
      },
      recipients: [
        {
          address: {
            email: data.email,
            name: `${data.shipping.fName} ${data.shipping.lName}`
          },
        },
        {
          address: {
            email: process.env.ADMIN_EMAIL,
            name: `${data.shipping.fName} ${data.shipping.lName}`
          },
        },
      ]
  })
};

const saveUser = async ({ name, email, message }) => {
  console.log("Save user")
  // Klaviyo sdk setup
  var defaultClient = client.ApiClient.instance;
  // Configure API key authorization: ApiKeyAuth
  var ApiKeyAuth = defaultClient.authentications['Y8mCdQ'];
  ApiKeyAuth.apiKey = "pk_7c96281b2406f78c7c82ad91634d688671";
  await ListsSegments.addMembers("Vs4P8F", {
    email: "butterboy@lewi.sh"
  }); // Set list ID
};

export default async function (req, res) {
  try {
    const data = req.body;
    console.log("Send email");

    await sendThankYouEmail(data);
    // await saveUser(data);

    res.status(200).json(true);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};