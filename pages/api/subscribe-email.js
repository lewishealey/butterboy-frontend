export default async function (req, res) {

const url = 'https://a.klaviyo.com/api/v2/list/Vs4P8F/members?api_key=' + process.env.KLAYVIO_API_KEY;
const options = {
  method: 'POST',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  body: JSON.stringify({
    profiles: [{email: 'george.washington@klaviyo.com'}, {phone_number: '+13239169023'}]
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => res.status(200).json(json))
  .catch(err => console.error('error:' + err));
}
