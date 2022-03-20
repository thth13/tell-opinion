const express = require('express');
const connectDB = require('./config/db');
// const bodyParser = require('body-parser');
const path = require('path');

const app = express();

connectDB();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use('/api/users/', require('./routes/api/users'));
app.use('/api/profile/', require('./routes/api/profile'));
app.use('/api/auth/', require('./routes/api/auth'));
app.use(express.static('public'));

// app.use('/avatars', express.static('avatars'));

if (process.env.NODE_ENV === 'production')  {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
