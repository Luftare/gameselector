let socket;
const app = new Vue({
  el: "#app",
  data: {
    id: null,
    myName: "",
    users: [],
    games: [],
    connected: false,
  },
  computed: {
    votePopulatedGames() {
      return this.games.map(g => {
        const voters = this.users.filter(u => u.vote === g.id);
        return Object.assign({}, g, { voters });
      })
    },
    votedGames() {
      return this.votePopulatedGames.filter(g => g.voters.length > 0);
    },
    descendingVotedGames() {
      return this.votedGames.sort((a, b) => b.voters.length - a.voters.length);
    },
    self() {
      const u = this.users.find(p => p.id === this.id);
      return u? u : {};
    }
  },
  methods: {
    updateName() {
      localStorage.setItem('myName', JSON.stringify(this.myName));
      socket.emit("updateName", this.myName);
    },
    voteGame(game) {
      if(this.self.vote === game.id) {
        socket.emit("userVote", 0);
      } else {
        socket.emit("userVote", game.id); 
      }
    },
    resetVote() {
      socket.emit("userVote", 0);
    }
  },
  mounted() {
    const myName = JSON.parse(localStorage.getItem('myName'));
    socket = io();
    socket.on("connect", () => {
      this.id = socket.io.engine.id;
      this.connected = true;
      if(myName) {
        this.myName = myName;
        this.updateName(myName);
      }
    });
    
    socket.on("usersUpdate", users => {
      this.users = users;
    });
    
    socket.on("gamesUpdate", games => {
      this.games = games;
    })
  }
});