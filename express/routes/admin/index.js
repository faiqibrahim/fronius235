const {authenticate} = require('../../../express/middlewares/index');

const {parseCurrentData, logCurrentData} = require('../../../utils/SolarUtils');
const SolarService = require('../../../services/SolarService');
const MeterService = require('../../../services/MeterService');
const SocketIO = require('../../../socket.io/index');

module.exports = (app) => {

    app.post('/validate-credentials', authenticate, (req, resp) => {
        resp.status(200).send({});
    })

    app.post('/current-data', authenticate, (req, resp) => {
        resp.status(200).send({});

        const data = parseCurrentData(req.body);
        logCurrentData(data);

        SolarService.saveStats(data)
            .then(() => SocketIO.broadcastCurrentOutput())
            .catch(console.error);
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
}
