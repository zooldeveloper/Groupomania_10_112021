const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');

const app = express(); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(helmet()); // It helps secure the app by setting some http headers
app.use(express.urlencoded({ extended: true })); // Parses the x-www-form.urlencoded
app.use(express.json());// Parses the application/json
app.use(cookieParser()) // Parse the cookies


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app; 