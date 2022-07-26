const SparkPost = require('sparkpost');

const sendThankYouEmail = async (data) => {
  console.log('Sending the email');
  console.log("data",data);
  // const client = new SparkPost(process.env.SPARKPOST_KEY);
  //   await client.transmissions
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
  //       },
  //     ]
  // })
};

const saveUser = async ({ name, email, message }) => {
  console.log("Save user")
  // const { AT_API_KEY: apiKey, AT_BASE, AT_TABLE } = process.env;
  // // Klaviyo sdk setup
  // const defaultClient = ApiClient.instance;
  // // Configure API key authorization: ApiKeyAuth
  // const ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
  // ApiKeyAuth.apiKey = "KLAVIYO PRIVATE KEY GOES HERE";

  // await ListsSegments.addMembers(listId, opts); // Set list ID
};

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    await sendThankYouEmail(data);
    await saveUser(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed sending email' }),
    };
  }
};