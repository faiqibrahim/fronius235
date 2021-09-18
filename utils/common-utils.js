const moment = require('moment-timezone');

const currentTime = () => {
    return moment().tz('Asia/Karachi').toDate();
}

module.exports = {
    currentTime
}
