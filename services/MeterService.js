require('./init-service');

const MeterRepo = require('../repos/MeterRepo');
const SolarRepo = require('../repos/SolarRepo');
const {prepareMeterReading, prepareUsageStats} = require('../utils/SolarUtils');

module.exports = class MeterService {

    static saveMeterReading = async (data) => {
        const lastReading = await MeterRepo.getLastMeterReading();
        const meterReading = prepareMeterReading(data, lastReading);
        await MeterRepo.saveMeterReading(meterReading);

        const {total_production: last_total_production} = await SolarRepo.findStatsByDay(lastReading.reading_date);
        const {total_production} = await SolarRepo.findStatsByDay(meterReading.reading_date);

        const usageStats = prepareUsageStats(lastReading, meterReading, total_production, last_total_production);

        await MeterRepo.saveUsageStats(usageStats);
    }
}
