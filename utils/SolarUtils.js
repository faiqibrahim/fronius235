const convert = require('convert-units');
const moment = require('moment-timezone');
const _ = require('lodash');
const {convertTZ, convertTZMoment, currentTime, TIME_FORMAT} = require('../utils/common-utils');

const parseCurrentData = (body) => {
    const data = JSON.parse(Object.keys(body)[0]);

    const time = data.Head.Timestamp.split(" ")[0];
    const dayEnergy = convert(data.Body.DAY_ENERGY.Values['1']).from(data.Body.DAY_ENERGY.Unit).to('kWh');
    const currentPower = convert(data.Body.PAC.Values['1']).from(data.Body.PAC.Unit).to('kW');
    const totalEnergy = convert(data.Body.TOTAL_ENERGY.Values['1']).from(data.Body.TOTAL_ENERGY.Unit).to('kWh');

    return {
        time: moment(time).format(TIME_FORMAT),
        dayEnergy,
        currentPower,
        totalEnergy
    }
}

const logCurrentData = (data) => {
    const info = `
    
        Time           : ${data.time}
        ----------------------------------
        Current Output : ${data.currentPower}kW
        Units Today    : ${data.dayEnergy}
        Units Total    : ${data.totalEnergy} 

    `;

    console.log(info);
}


const prepareUsageStats = (lastReading, meterReading, total_production, last_total_production) => {
    const from_date = lastReading.reading_date;
    const to_date = meterReading.reading_date;
    const {days_span} = meterReading;

    const export_units = _.round(+meterReading.export_units - +lastReading.export_units, 2);
    const import_units = _.round(+meterReading.import_units - +lastReading.import_units, 2);
    const import_units_per_day = _.round(import_units / days_span, 2);

    // Production = Export Units + Direct Solar Consumed Units  e.g 10 = 7 + 3
    // House Consumption = Import Units + Direct Solar Consumed Units e.g 8 = 5 + 3
    // Net Export = Production - House Consumption e.g 2 = 10 - 8

    const production = _.round(+total_production - +last_total_production, 2);
    const production_per_day = _.round(production / days_span, 2);

    const direct_solar_units = _.round(production - export_units, 2);
    const direct_solar_units_per_day = _.round(direct_solar_units / days_span, 2);

    const consumed_units = _.round(import_units + direct_solar_units, 2);
    const consumed_units_per_day = _.round(consumed_units / days_span, 2);

    const net_export = _.round(production - consumed_units, 2);
    const net_export_per_day = _.round(net_export / days_span, 2);

    return {
        from_date,
        to_date,
        days_span,

        production,
        production_per_day,

        net_export,
        net_export_per_day,

        consumed_units,
        consumed_units_per_day,

        grid_import_units: import_units,
        grid_import_units_per_day: import_units_per_day,

        direct_solar_units,
        direct_solar_units_per_day,
    }
}


const prepareMeterReading = (data, lastReading) => {
    const reading_date = convertTZMoment(data.reading_date);
    const lastReadingDate = moment(lastReading.reading_date);

    const days_span = reading_date.diff(lastReadingDate, 'days', false);
    const import_units = _.round(data.import_units, 2);
    const export_units = _.round(data.export_units, 2);
    const export_per_day = _.round((export_units - lastReading.export_units) / days_span, 2);
    const import_per_day = _.round((import_units - lastReading.import_units) / days_span, 2);

    const now = currentTime();

    const reading = {
        reading_date: convertTZ(reading_date),
        export_units,
        import_units,
        days_span,
        export_per_day,
        import_per_day,
        created_at: now,
        updated_at: now
    }

    validateReading(reading, lastReading);

    return reading;
}


const validateReading = (reading, lastReading) => {
    const validDate = moment(reading.reading_date).isAfter(moment(lastReading.reading_date));
    const validExportUnits = (reading.export_units - lastReading.export_units) >= 0
    const validImportUnits = (reading.import_units - lastReading.import_units) >= 0

    if (!validDate || !validImportUnits || !validExportUnits) {
        throw new Error("Invalid reading data");
    }
}

module.exports = {
    parseCurrentData,
    logCurrentData,
    prepareUsageStats,
    prepareMeterReading
}
