const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const quizRoute = require('./router/quiz')
const materiRoute = require('./router/materi')
const kategoriRoute = require('./router/kategori')
const jobsheetRoute = require('./router/jobsheet')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extented: true}));
app.use('/public', express.static('public'));

const db = require('./models')
db.sequelize.sync()

app.get('/', (req, res) =>{
    res.send('Quiz ExpressJS API by Olinn');
});

app.use('/api/quizzez', quizRoute)
app.use('/api/materi', materiRoute)
app.use('/api/kategori', kategoriRoute)
app.use('/api/jobsheet', jobsheetRoute)

app.listen(port, () => console.log(`App Listening on port http://localhost:${port}!`));