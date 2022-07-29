var client = require('klaviyo-sdk');

export default async function (req, res) {
  // Klaviyo sdk setup
  var defaultClient = client.ApiClient.instance;
  // Configure API key authorization: ApiKeyAuth
  var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
  ApiKeyAuth.apiKey = "pk_7c96281b2406f78c7c82ad91634d688671";

  const campaigns = await client.ListsSegments.getLists();
  // await client.ListsSegments.addMembers("Vs4P8F", {
  //   email: "butterboy@lewi.sh"
  // }); // Set list ID
  res.status(200).json(campaigns);
}
