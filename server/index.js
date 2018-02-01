import Express from 'express';
import path from 'path';
import { Sequelize } from 'sequelize';
import bodyParser from 'body-parser';

const app = new Express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(Express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.json());
// ========================
//  API
// ========================
import incRouter from './routes/Inc.routes.js';
import targetRouter from './routes/Targets.routes.js';

app.use('/api', incRouter);
app.use('/api', targetRouter);

// ========================
//  React App
// ========================
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
