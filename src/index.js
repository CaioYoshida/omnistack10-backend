const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-2qe63.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB ok'))
  .catch(err => console.log(`Error: ${err}`));

// this line below must be before all routes.
app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server running on port 3333');
});

