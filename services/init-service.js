const moment = require('moment-timezone');
const MeterRepo = require('../repos/MeterRepo');

const SOLAR_INCEPTION_DATE = moment('2020-11-13').toDate();
const SOLAR_INCEPTION_READING = {
    reading_date: SOLAR_INCEPTION_DATE,
    import_units: 0,
    export_units: 0,
    days_span: 0,
    import_per_day: 0,
    export_per_day: 0,
    created_at: SOLAR_INCEPTION_DATE,
    updated_at: SOLAR_INCEPTION_DATE
}

MeterRepo.getLastMeterReading()
    .then(lastReading => {
        if (!lastReading) {
            return MeterRepo.saveMeterReading(SOLAR_INCEPTION_READING);
        }
    })
    .catch(console.error);
