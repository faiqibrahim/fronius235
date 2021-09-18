const moment = require('moment-timezone');

const currentTime = () => {
    return convertTZ(new Date());
}

const convertTZMoment = (date) => moment(date).tz('Asia/Karachi');

const convertTZ = (date, format = 'YYYY-MM-DD HH:mm:ss.SSS') => {
    return convertTZMoment(date).format(format);
}

module.exports = {
    currentTime,
    convertTZ,
    convertTZMoment
}
