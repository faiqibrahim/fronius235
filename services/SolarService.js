const SolarRepo = require('../repos/SolarRepo');
const moment = require('moment');
const {currentTime} = require('../utils/common-utils');
const Redis = require('../redis/Redis');
const {CURRENT_POWER} = require('../redis/cache-keys');

module.exports = class SolarService {

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
        await Promise.all([SolarRepo.saveDayStats(stats), SolarRepo.saveYearStats(stats)]);
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
