const data = require('./solarweb.json');
const moment = require('moment-timezone');
const _ = require('lodash');
const {convertTZ} = require('../utils/common-utils');

const prepareMigrationData = () => {
    const preparedData = [];
    const yearEnergies = {};
    let totalEnergy = 0;

    data.forEach(month_data => {
        const monthData = JSON.parse(month_data);

        monthData.settings.series[0].data.forEach(day => {
            const time = convertTZ(day[0]);
            const year = convertTZ(day[0], 'YYYY');
            const units = day[1];

            totalEnergy = _.round(totalEnergy + units, 2);
            yearEnergies[year] = _.round((yearEnergies[year] || 0) + units, 2);

            preparedData.push({
                time: time.format('YYYY-MM-DD'),
                dayEnergy: units,
                currentPower: 0,
                totalEnergy,
                yearEnergy: yearEnergies[year]
            });
        })
    });

    return preparedData;
}

module.exports = {
    prepareMigrationData
}
