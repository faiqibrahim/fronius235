const basicAuth = require('express-basic-auth');

const logRequestBody = (req, resp, next) => {
    console.info("\n########## REQ REC START ##########")
    console.info(req.originalUrl, new Date(), req.body);
    console.info("########## REQ REC END   ########## \n");

    next();
}

const authenticate = basicAuth({
    users: {
        [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PW
    }
});

module.exports = {
    logRequestBody,
    authenticate
};
