const data = require('./solarweb.json');
const moment = require('moment-timezone');
const _ = require('lodash');
const convert = require('convert-units');

const prepareMigrationData = () => {
    const preparedData = [];
    const yearEnergies = {};
    let totalEnergy = 0;

    data.forEach(month_data => {
        const monthData = JSON.parse(month_data);

        monthData.settings.series[0].data.forEach(day => {
            const time = moment(day[0]).tz('Asia/Karachi');
            const year = time.format('YYYY');
            const units = day[1];

            totalEnergy = _.round(totalEnergy + units, 2);
            yearEnergies[year] = _.round((yearEnergies[year] || 0) + units, 2);

            preparedData.push({
                time: time.toISOString(),
                dayEnergy: units,
                currentPower: 0,
                totalEnergy,
                yearEnergy: yearEnergies[year]
            });
        })
    });

    console.log(`Prepared data for ${preparedData.length} days`);

    return preparedData;
}

module.exports = {
    prepareMigrationData
}
