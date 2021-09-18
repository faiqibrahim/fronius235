require('./db/pg');

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const basicAuth = require('express-basic-auth');
const convert = require('convert-units');
const moment = require('moment');

const app = express();

app.use(basicAuth({
    users : {
        [process.env.BASIC_AUTH_USER] : process.env.BASIC_AUTH_PW
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.post('/current-data', (req, resp) => {
    resp.status(200).send({});

    const data = JSON.parse(Object.keys(req.body)[0]);

    const now = moment(data.Head.Timestamp.split(" ")[0]).format("dddd, MMMM Do YYYY, h:mm:ss a");
    const dayEnergy = convert(data.Body.DAY_ENERGY.Values['1']).from(data.Body.DAY_ENERGY.Unit).to('kWh');
    const currentPower = convert(data.Body.PAC.Values['1']).from(data.Body.PAC.Unit).to('kW');
    const totalEnergy = convert(data.Body.TOTAL_ENERGY.Values['1']).from(data.Body.TOTAL_ENERGY.Unit).to('kWh');
    const yearEnergy = convert(data.Body.YEAR_ENERGY.Values['1']).from(data.Body.YEAR_ENERGY.Unit).to('kWh');

    const info = `
    
        Time           : ${now}
        ----------------------------------
        Current Output : ${currentPower}kW
        Units Today    : ${dayEnergy}
        Units Year     : ${yearEnergy}
        Units Total    : ${totalEnergy} 
       
    `;

    console.log(info);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.info(`Server up at port ${PORT}`);
});
