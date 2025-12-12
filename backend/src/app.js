const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const errorHandler = require('./mw/error');
const openapiSpec = require('./docs/openapi');

// Import routes
const authRoutes = require('./modules/auth/routes');
const usersRoutes = require('./modules/users/routes');
const storiesRoutes = require('./modules/stories/routes');
const chaptersRoutes = require('./modules/chapters/routes');
const commentsRoutes = require('./modules/comments/routes');
const votesRoutes = require('./modules/votes/routes');
const followsRoutes = require('./modules/follows/routes');
const tagsRoutes = require('./modules/tags/routes');
const favoritesRoutes = require('./modules/favorites/routes');
const readingRoutes = require('./modules/reading/routes');
const reviewsRoutes = require('./modules/reviews/routes');
const uploadRoutes = require('./modules/upload/routes');
const readingListsRoutes = require('./modules/reading-lists/routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ charset: 'utf-8' }));
app.use(express.urlencoded({ extended: true, charset: 'utf-8' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// API Documentation
const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'WebToon API Docs'
};
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(openapiSpec, swaggerOptions));

// Set default charset for JSON responses (after swagger)
app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return originalJson.call(this, data);
    };
    next();
});

// Mount routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/tags', tagsRoutes); // Mount tags BEFORE stories to avoid route conflict
app.use('/stories', storiesRoutes);
app.use('/chapters', chaptersRoutes);
app.use('/comments', commentsRoutes);
app.use('/votes', votesRoutes);
app.use('/follows', followsRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/reading', readingRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/upload', uploadRoutes);

// Mount routes at root - ORDER MATTERS! More specific routes must come first
app.use('/', readingRoutes); // Mount first for /followed-stories endpoints
app.use('/', readingListsRoutes); // Mount second for /reading-lists endpoints
app.use('/', chaptersRoutes); // Mount last (has catch-all /:id route)

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/docs`);
});

module.exports = app;
