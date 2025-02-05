// server.ts
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 6420;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/api/whatever', (req, res) => {
    console.log(req.body);
    res.send('This is the /api/whatever endpoint');
});
