export default function (req, res) {
    const profile = {
        "profiles": [
          {
            "email": "hello@lewi.sh"
          },
        ]
    }

    try {
        fetch("https://a.klaviyo.com/api/v2/list/Vs4P8F/subscribe?api_key=pk_7c96281b2406f78c7c82ad91634d688671", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: profile
        }).then((data) => {
            res.status(200).json(data);
        })
      } catch(e){
        console.error("Error")
        res.json(e);
    } finally {
        res.status(200);
    }
}
