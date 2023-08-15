const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { sequelize } = require('./models');
const routes = require('./controllers');


const app = express();
const PORT = process.env.PORT || 3001;

// Set up session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Set up Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets
app.use(express.static('public'));

// Define routes
app.use('/', require('./controllers/homeController'));
app.use('/dashboard', require('./controllers/dashboardController'));
app.use('/auth', require('./controllers/authController'));

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});


