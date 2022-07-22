const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST_KEY);

export default function (req, res) {
  res.status(200).json(true);
}
