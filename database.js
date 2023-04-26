const roomsDatabase = {
  r1: {
    name:"Lobby_A",
    cameras:[c1, c2],
}
}


const camerasDatabase = {
  c1: {
    room: "Lobby_A",
    status:"online",
  },
  c2: {
    room: "Lobby_A",
    status:"online"
  },
};

const usersDatabase = {
  id123: {
    id: "id123",
    email: "user@example.com",
    password: "123",
  },
  id456: {
    id: "id456",
    email: "user2@example.com",
    password: "123",
  },
};


module.exports = {camerasDatabase, usersDatabase, roomsDatabase};