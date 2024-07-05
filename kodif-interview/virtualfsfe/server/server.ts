import express from 'express';
import apiRouter from './routes/api';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
