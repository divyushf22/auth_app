const express = require('express');
const app = express();

// Define middlewares
const adminMiddleware = (req, res, next) => {
  console.log('Admin middleware');
  next();
};

const userMiddleware = (req, res, next) => {
  console.log('User middleware');
  next();
};

const regularMiddleware = (req, res, next) => {
  console.log('Regular middleware');
  next();
};

// Define a conditional middleware that executes an array of middlewares
const conditionalMiddleware = (middlewares) => {
  return (req, res, next) => {
    // Check the condition based on properties of the req object
    const condition = req.query.isAdmin === 'true';

    if (condition) {
      // If the condition is met, execute the array of middlewares
      middlewares.forEach(middleware => middleware(req, res, next));
    } else {
      // If the condition is not met, continue to the next middleware
      next();
    }
  };
};

// Use the conditional middleware for a specific route with an array of middlewares
app.get('/admin', conditionalMiddleware([adminMiddleware, userMiddleware]), (req, res) => {
  res.send('Admin dashboard');
});

// Use the conditional middleware for another route with a single middleware
app.get('/user', conditionalMiddleware([userMiddleware]), (req, res) => {
  res.send('User dashboard');
});

// Regular middleware for all routes
app.use(regularMiddleware);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});