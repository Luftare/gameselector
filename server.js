const port = 8008;

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/',express.static(__dirname +'/client'));
app.use('/',express.static(__dirname +'/node_modules/socket.io-client/dist'));
app.use('/',express.static(__dirname +'/node_modules/vue/dist'));

http.listen(port);

const voteTTL = 1000 * 60 * 5;//10 minutes
let users = [];
let games = ["PUBG", "WoW", "BF1", "BF4", "Rust"].map((g, i) => ({
  name: g,
  id: i + 1,
}));

setInterval(() => {
  const now = Date.now();
  users = users.map(u => {
    return now - u.voteTime > voteTTL? Object.assign({}, u, { vote: 0 }) : u;
  })
  io.sockets.emit("usersUpdate", users);
}, voteTTL / 4);

io.sockets.on("connection", socket => {
  socket.emit("gamesUpdate", games);
  users.push({
    id: socket.id,
    name: "",
    vote: 0,
    voteTime: Date.now(),
  })
  io.sockets.emit("usersUpdate", users);
  
  socket.on("getUsers", cb => cb(users));
  socket.on("getGames", cb => cb(games));
  socket.on("updateName", name => {
    users = users.map(u => {
      return u.id === socket.id?
        Object.assign({}, u, { name })
        : u;
    });
    io.sockets.emit("usersUpdate", users);
  });
  socket.on("userVote", vote => {
    users = users.map(u => {
      const voteTime = Date.now();
      return u.id === socket.id?
        Object.assign({}, u, { voteTime, vote })
        : u;
    });
    io.sockets.emit("usersUpdate", users);
  });
  socket.on("resetVotes", () => {
    users = users.map(u => Object.assign({}, u, { vote: 0 }));
    io.sockets.emit("usersUpdate", users);
  });
  socket.on("disconnect", () => {
    users = users.filter(u => u.id !== socket.id);
  });
});