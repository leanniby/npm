const axios = require("axios");
var player = require("play-sound")((opts = {}));

const url = "https://npm.by/booking/route-time";

setInterval(() => {
  axios({
    method: "post",
    url,
    params: {
      id_departure_station: 38,
      departure_is_waypoint: 0,
      id_arrival_station: 64,
      arrival_is_waypoint: 0,
      date: "03-08-2018"
    },
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  }).then(response => {
    const data = response.data["Пт"].filter(v => v.count).map(v => v.time);
    const alert = data.some(v => v > "18:00");
    if (alert) {
      player.play("ring.mp3", err => {
        if (err) throw err;
      });
    }
    console.log(data);
  });
}, 10000);
