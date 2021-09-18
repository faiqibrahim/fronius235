require('./db/pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, resp) => {
    resp.status(200).send({});
})

app.post('/io-states', (req, resp) => {
    resp.status(200).send({});
    console.log('io-states', new Date(), JSON.stringify(req.body, undefined, 2));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.info(`Server up at port ${PORT}`);
});
