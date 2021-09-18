const SolarRepo = require('../repos/SolarRepo');
const moment = require('moment');
const {currentTime} = require('../utils/common-utils');
const Redis = require('../redis/Redis');
const {CURRENT_POWER} = require('../redis/cache-keys');
const {prepareMigrationData} = require('../migration/migrator');

module.exports = class SolarService {

    static loadMigrationData = async () => {
        const records = prepareMigrationData();
        for (let record of records) {
            await SolarService.saveStats(record);
            console.log(`Processed Record of ${record.time}`);
        }
    }

    static saveStats = async (input) => {
        const now = currentTime();

        const stats = {
            ...input,
            day: moment(input.time).format('YYYY-MM-DD'),
            year: moment(input.time).format('YYYY'),
            created_at: now,
            updated_at: now
        }

        this.#cacheCurrentOutput(stats);
        await SolarRepo.saveDayStats(stats);
        await SolarRepo.saveYearStats(stats);
    }

    static #cacheCurrentOutput = (output) => {
        Redis.set(CURRENT_POWER, JSON.stringify(output)).catch(console.error);
    }

    static getCurrentOutput = () => Redis.get(CURRENT_POWER).then(JSON.parse);

    static getDayStats = (year, lastDay) => {
        return SolarRepo.findDayStats(year, lastDay);
    }

    static getYearStats = () => {
        return SolarRepo.findYearStats();
    }
}