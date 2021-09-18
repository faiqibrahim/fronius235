const logRequestBody = (req, resp, next) => {
    console.info("\n########## REQ REC START ##########")
    console.info(req.originalUrl, new Date(), req.body);
    console.info("########## REQ REC END   ########## \n");

    next();
}

const basicAuth = (req, resp, next) => {

}

module.exports = {
    logRequestBody
};
