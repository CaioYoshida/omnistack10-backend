const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-2qe63.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log('MongoDB ok'))
  .catch(err => console.log(`Error: ${err}`));

app.use(cors());

// this line below must be before all routes.
app.use(express.json());

app.use(routes);

server.listen(3333, () => {
  console.log('Server running on port 3333');
});
