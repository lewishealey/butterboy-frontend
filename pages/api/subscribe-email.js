export default function (req, res) {
    const profile = {
        "profiles": [
          {
            "email": "fwefwefew@lewi.sh"
          },
        ]
    }
    fetch("https://a.klaviyo.com/api/v2/list/Vs4P8F/subscribe?api_key=pk_7c96281b2406f78c7c82ad91634d688671", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: profile
    }).then((data) => {
        return res.status(200).end();
      }).catch((err) => {
        return res.status(500).send(error);
      });
}
