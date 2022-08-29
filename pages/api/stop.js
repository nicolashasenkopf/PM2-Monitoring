const pm2 = require("pm2");

export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  if (id != null && id.length > 0) {
    pm2.connect(function (error) {
      // handle errors
      if (error) {
        return res.status(500).json({ error });
      }

      pm2.stop(id, (error, proc) => {
        pm2.disconnect();

        // handle errors
        if (error) {
          return res.status(500).json({ error });
        }

        return res.status(200).json({ message: "Successfully stopped " + id });
      });
    });
  } else {
    res.status(400).json({ error: { message: "No id given in query" } });
  }
}
