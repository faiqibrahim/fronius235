const moment = require('moment-timezone');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

const currentTime = () => {
    return convertTZ(new Date());
}

const convertTZMoment = (date) => moment(date).tz('Asia/Karachi');

const convertTZ = (date, format = TIME_FORMAT) => {
    return convertTZMoment(date).format(format);
}

module.exports = {
    currentTime,
    convertTZ,
    convertTZMoment,
    TIME_FORMAT
}
