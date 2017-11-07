let socket;
const app = new Vue({
  el: "#wall",
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
        return Object.assign({}, g, {
          voters
        });
      });
    },
    votedGames() {
      return this.votePopulatedGames.filter(g => g.voters.length > 0);
    },
    descendingVotedGames() {
      return this.votedGames.sort((a, b) => b.voters.length - a.voters.length);
    },
    winningGame() {
      return this.descendingVotedGames[0];
    },
    self() {
      const u = this.users.find(p => p.id === this.id);
      return u ? u : {};
    },
    allVoted() {
      return this.users.filter(u => u.vote === 0).length === 0;
    }
  },
  methods: {
    updateName() {
      localStorage.setItem('myName', JSON.stringify(this.myName));
      socket.emit("updateName", this.myName);
    },
    voteGame(game) {
      //document.getElementById("wall").style.backgroundImage=`url(${game.url})`
      if (this.self.vote === game.id) {
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
    socket = io(document.URL, {'forceNew': true});
    socket.on("connect", () => {
      this.id = socket.io.engine.id;
      this.connected = true;
      if (myName) {
        this.myName = myName;
        this.updateName(myName);
      }
    });

    socket.on("usersUpdate", users => {
      this.users = users;
      setTimeout(() => {
        if (this.allVoted) {
          const game = this.winningGame;
          document.getElementById("wall").style.backgroundImage = `url(${game.url})`
        }
      }, 0);
    });

    socket.on("gamesUpdate", games => {
      this.games = games;
    })
  }
});