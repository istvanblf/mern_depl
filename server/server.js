const express = require("express");
const cors = require("cors");


// Environment vars.
const port = 8000;
const db_name = "pets";

// Immediately execute the import mongoose.config.js function.
require("../config/mongoose.config")(db_name);

const app = express();

// req.body undefined without this!
app.use(express.json());
app.use(cors());

require("../routes/pet.routes")(app);

const server = app.listen(port, () =>
  console.log(`Listening on port ${port} for REQuests to RESpond to.`)
);

// app.listen(port, () =>
//   console.log(`Listening on port ${port} for REQuests to RESpond to.`)
// );

const io = require('socket.io')(server, { cors: true });

io.on("connection", socket => {
  console.log("A user connected || Socket ID:", socket.id);
  socket.on("event_from_client", data => {
    socket.broadcast.emit("send_data_to_all_other_clients", data);
  });
  socket.emit("hello","Hello from the server");
  socket.on("listen", msg => {
    console.log("Server received msg:",msg);
  })
});