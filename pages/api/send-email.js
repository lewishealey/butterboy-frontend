const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

export default function (req, res) {
  const data = {
    date: req.body.date,
    prettyDate: req.body.prettyDate,
    page: req.body.page,
    subject: req.body.subject,
    adminSubject: req.body.adminSubject,
    fName: req.body.firstName,
    lName: req.body.lastName,
    userEmail: req.body.email,
    dob: req.body.dob,
    phone: req.body.phone,
    streetAddress: req.body.streetAddress,
    careersName: req.body.careersName,
    careersPhone: req.body.careersPhone,
    postCode: req.body.postCode,
    hearAbout: req.body.hearAbout,
    profession: req.body.profession,
    notes: req.body.notes,
    repName: req.body.repName,
    repEmail: req.body.repEmail,
    repName: req.body.repName,
    repPhone: req.body.repPhone,
    repImage: req.body.repImage,
    repImage: req.body.repImage,
    files: req.body.files,
    replyTo: req.body.repEmail ? req.body.repEmail : req.body.email,
    from: req.body.repName
      ? `${req.body.repName} @ Mumford & Wood`
      : "Mumford & Wood",
  };

  client.transmissions
    .send({
      metadata: data,
      content: {
        template_id: "butterboy",
        subject: "New order" //data.subject,
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
        //     email: data.repEmail ? data.repEmail : adminEmail,
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
