const convert = require('convert-units');
const moment = require('moment');

const parseCurrentData = (body) => {
    const data = JSON.parse(Object.keys(body)[0]);

    const time = data.Head.Timestamp.split(" ")[0];
    const dayEnergy = convert(data.Body.DAY_ENERGY.Values['1']).from(data.Body.DAY_ENERGY.Unit).to('kWh');
    const currentPower = convert(data.Body.PAC.Values['1']).from(data.Body.PAC.Unit).to('kW');
    const totalEnergy = convert(data.Body.TOTAL_ENERGY.Values['1']).from(data.Body.TOTAL_ENERGY.Unit).to('kWh');
    const yearEnergy = convert(data.Body.YEAR_ENERGY.Values['1']).from(data.Body.YEAR_ENERGY.Unit).to('kWh');

    return {
        time,
        dayEnergy,
        currentPower,
        totalEnergy,
        yearEnergy
    }
}

const logCurrentData = (data) => {
    const info = `
    
        Time           : ${data.time}
        ----------------------------------
        Current Output : ${data.currentPower}kW
        Units Today    : ${data.dayEnergy}
        Units Year     : ${data.yearEnergy}
        Units Total    : ${data.totalEnergy} 

    `;

    console.log(info);
}

module.exports = {
    parseCurrentData,
    logCurrentData
}
