import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


// start server
app.listen(port, ()=> {
    console.log(`Server listening at port ${port}`)
});