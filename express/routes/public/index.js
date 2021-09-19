const SolarService = require('../../../services/SolarService');
const MeterService = require('../../../services/MeterService');
const path = require('path');

const client_path = path.resolve(__dirname, '..', '..', '..', 'client', 'build', 'index.html');
console.info("Client Path at", client_path);

module.exports = (app) => {

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
        res.sendFile(client_path);
    });
}
