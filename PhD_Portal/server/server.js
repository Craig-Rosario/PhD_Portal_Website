import express from 'express';
import sequelize from './config/db.js';
import routes from './routes/index.js';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

// Create upload dir if not exist
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
