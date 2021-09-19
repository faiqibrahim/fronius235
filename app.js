require('./db/pg');
require('./redis/Redis');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {authenticate} = require('./express/middlewares/index');

const app = express();

const {parseCurrentData, logCurrentData} = require('./utils/SolarUtils');
const SolarService = require('./services/SolarService');
const MeterService = require('./services/MeterService');

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/current-power', (req, resp) => {
    SolarService.getCurrentOutput()
        .then(power => {
            resp.status(200).send({power});
        })
        .catch(err => {
            console.error('Error occurred while fetching current-power', err);
            resp.status(500).send({});
        })
});

app.get('/day-stats', (req, resp) => {
    SolarService.getDayStats(req.query.year, req.query.lastDay)
        .then(stats => {
            resp.status(200).send({stats});
        })
        .catch(err => {
            console.error('Error occurred while fetching day-stats', err);
            resp.status(500).send({});
        })
});

app.get('/year-stats', (req, resp) => {
    SolarService.getYearStats(req.query.year, req.query.lastDay)
        .then(stats => {
            resp.status(200).send({stats});
        })
        .catch(err => {
            console.error('Error occurred while fetching day-stats', err);
            resp.status(500).send({});
        })
});

app.get('/meter-readings', (req, resp) => {
    MeterService.getMeterReadings(req.query.lastReadingDate)
        .then(readings => {
            resp.status(200).send({readings});
        })
        .catch(err => {
            console.error('Error occurred while fetching meter-readings', err);
            resp.status(500).send({});
        })
});

app.get('/usage-stats', (req, resp) => {
    MeterService.getUsageStats(req.query.lastId)
        .then(stats => {
            resp.status(200).send({stats});
        })
        .catch(err => {
            console.error('Error occurred while fetching usage-stats', err);
            resp.status(500).send({});
        })
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.post('/current-data', authenticate, (req, resp) => {
    resp.status(200).send({});

    const data = parseCurrentData(req.body);
    logCurrentData(data);

    SolarService.saveStats(data).catch(console.error);
});

app.post('/meter-reading', authenticate, (req, resp) => {
    MeterService.saveMeterReading(req.body)
        .then(reading => {
            resp.status(200).send({reading});
        })
        .catch(err => {
            console.error('Error occurred while saving meter-reading', err);
            resp.status(500).send({});
        })
});

app.patch('/migrate', authenticate, (req, resp) => {
    SolarService.loadMigrationData()
        .then(() => {
            resp.status(200).send({});
        })
        .catch(err => {
            console.error('Error occurred while saving migration-data', err);
            resp.status(500).send({});
        })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.info(`Server up at port ${PORT}`);
});
