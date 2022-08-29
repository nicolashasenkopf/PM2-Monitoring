const pm2 = require("pm2");

export function dummyList() {
  return [
    {
      name: "Dummy app 1",
      status: "ONLINE",
      uptime: 1000 * 60 * 60 * 24 * 3, // 3 days
      restarts: 1,
      cpu: "2",
      memory: "200",
    },
    {
      name: "Dummy app 2",
      status: "ONLINE",
      uptime: 1000 * 60 * 60 * 24 * 3, // 3 days
      restarts: 1,
      cpu: "2",
      memory: "200",
    },
    {
      name: "Dummy app 3",
      status: "ONLINE",
      uptime: 1000 * 60 * 60 * 24 * 3, // 3 days
      restarts: 1,
      cpu: "2",
      memory: "200",
    },
    {
      name: "Dummy app 4",
      status: "OFFLINE",
      uptime:
        1000 * 60 * 60 * 24 * 3 +
        1000 * 60 * 60 * 5 +
        1000 * 60 * 35 +
        1000 * 45, // 3 days
      restarts: 1,
      cpu: "2",
      memory: "200",
    },
    {
      name: "Dummy app 5",
      status: "ONLINE",
      uptime: 1000 * 60 * 60 * 24 * 3, // 3 days
      restarts: 1,
      cpu: "2",
      memory: "200",
    },
  ];
}

export default function handler(req, res) {
  pm2.connect(function (error) {
    // handle errors
    if (error) {
      return res.status(500).json({ error });
    }

    pm2.list((error, list) => {
      // handle errors
      if (error) {
        return res.status(500).json({ error });
      }

      // Disconnect
      pm2.disconnect();

      // map items
      let mappedList = [];
      for (let i = 0; i < list.length; i++) {
        mappedList.push({
          name: list[i].name,
          status: list[i].pm2_env.status,
          uptime: Date.now() - list[i].pm2_env.pm_uptime,
          restarts: list[i].pm2_env.restart_time,
          cpu: list[i].monit.cpu,
          memory: list[i].monit.memory,
        });
      }

      // send response
      res.status(200).json({ list: mappedList });
    });
  });
}
